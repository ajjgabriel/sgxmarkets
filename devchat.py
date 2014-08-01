import cgi
import os
import urllib
import logging
import pickle

from google.appengine.api import users
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.ext import db
from google.appengine.ext.webapp import template
from google.appengine.api import memcache

from google.appengine.api import urlfetch
import urllib2
import urllib
try:
    import json
except ImportError:
    import simplejson as json
from array import *
# Set the debug level
_DEBUG = True

class MainRequestHandler(webapp.RequestHandler):
  def get(self):
    

    url = "http://sgx.com/proxy/SgxDominoHttpProxy?timeout=3600&dominoHost=http%3A%2F%2Finfofeed.sgx.com%2FApps%3FA%3DCOW_App_DB%26B%3Dstockchart%26C_T%3D-1"
    result = urlfetch.fetch(url)
    data = json.dumps(result.content).replace("\\n", "").replace("\\t","").replace("\\","").replace("\'","")
    data = data[5:-1]
    
    loadResult = json.loads(data)
    
    x = -1
    for k in  loadResult['items']:
      x = x + 1
      
    #stockDropDown
    stockDropDown = "<select id=\"stockDropDown\" onchange=\"announcements()\">"
    for counter in range(0, x):
      stockDropDown = stockDropDown + "<option value=\""  
      for i in  loadResult['items'][counter]['HP Code']:
        stockDropDown = stockDropDown + i 
        
      stockDropDown = stockDropDown + "\">"
      for i in  loadResult['items'][counter]['Stock Name']:
        stockDropDown = stockDropDown + i
      stockDropDown = stockDropDown + "</option>"
    stockDropDown = stockDropDown + "</select>"
    
    monthDropDown = "<select id=\"monthDropDown\"  onchange=\"announcements()\"><option value=\"1\">1 Month</option><option value=\"3\">3 Months</option>"
    monthDropDown = monthDropDown + "<option value=\"6\">6 Months</option><option value=\"12\">1 Year</option></select>"

    template_values = {}
    template_values['title'] = "SGX Markets"
    template_values['stocksDropDown'] = stockDropDown
    template_values['monthDropDown'] = monthDropDown    

    path = os.path.join(os.path.dirname(__file__), 'templates/index.html')
    self.response.out.write(template.render(path, template_values))
    
class FundamentalsRequestHandler(webapp.RequestHandler):
  def get(self):
    encodedUrl = urllib.quote(self.request.get("Query"))
    """ Get Announcement """
    url = "http://query.yahooapis.com/v1/public/yql?q=" + encodedUrl + "&format=json&&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    result = urlfetch.fetch(url)
    self.response.out.write(result.content)

class KeyRequestHandler(webapp.RequestHandler):
  def get(self):
    encodedUrl = urllib.quote(self.request.get("Query"))
    """ Get Announcement """
    url = "http://query.yahooapis.com/v1/public/yql?q=" + encodedUrl + "&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    result = urlfetch.fetch(url)
    self.response.out.write(result.content)

class AnnouncementRequestHandler(webapp.RequestHandler):
  def get(self):
    encodedUrl = urllib.quote(self.request.get("StockName"))
    """ Get Announcement """
    url = "http://sgx.com/proxy/SgxDominoHttpProxy?timeout=60&dominoHost=http%3A%2F%2Finfofeed.sgx.com%2FApps%3FA%3DCOW_CorpAnnouncement_Content%26B%3DAnnouncementByCompanyName%26R_C%3D" + encodedUrl + "%26C_T%3D5"
    result = urlfetch.fetch(url)
    jsonResult = json.dumps(result.content).replace("\\n", "").replace("\\t","").replace("\\","").replace("\'","")
    
    announcementTable = jsonResult[5:-1]
    
    if announcementTable.find('No documents found') < 0:
      self.response.out.write(announcementTable)
    else:
      self.response.out.write(announcementTable)
                                                
application = webapp.WSGIApplication(
                                     [('/', MainRequestHandler),
                                      ('/announcements', AnnouncementRequestHandler),
                                      ('/fundamentals', FundamentalsRequestHandler),
                                       ('/Key', KeyRequestHandler)],
                                     debug=True)

def main():
  run_wsgi_app(application)

if __name__ == "__main__":
  main()