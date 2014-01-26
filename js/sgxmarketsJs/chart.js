function callChart(numberOfMonths)
{
  var todayString = getPreviousDay();
  var previousDayMinusNOM = getPreviousDayMinusNOM(numberOfMonths);
  
  symbol = $('#stockDropDown').val();
  
  chart("select * from yahoo.finance.historicaldata where symbol = \""+ symbol + ".SI\" and startDate = \""+ previousDayMinusNOM + "\" and endDate = \""+ todayString + "\"");
}

function chart(query)
{
 var jsonArray = new Array();
 encodedQuery = encodeURIComponent(query);

 $.get('http://query.yahooapis.com/v1/public/yql?q='
                     + encodedQuery +"&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=", function(data) {
     
     jsonArray = new Array();
     for (var key in data.query.results.quote)
      {
      alert(data.query.results.quote[key].Date);
               jsonArray[key] =  ["'" + data.query.results.quote[key].Date + "'", parseFloat(data.query.results.quote[key].Close)];

      }   
     buildChart(jsonArray);
  });
  }
  function buildChart(jsonArray)
  {
   $('#chart1').empty();
  var plot1 = $.jqplot('chart1', [jsonArray], {
    title:'',
    axes:{
        xaxis:{
            renderer:$.jqplot.DateAxisRenderer
        }
    },
    series:[{lineWidth:4, markerOptions:{style:'square'}}]
  });
    
  }

 
function getPreviousDay()
{
    var today = new Date();
  var todayString = "";
   today.setDate(today.getDate()-1);
   
   var getDay = "";
   var getMonth = "";
   if(today.getDay() < 10)
   {
     getDay = "0" + today.getDay();
   }
   else 
   {
     getDay =  today.getDay();
   }
   
   if(today.getMonth() < 10)
   {
     getMonth = "0" + today.getMonth();
   }
   else 
   {
      getMonth = today.getMonth();
   }
   
   todayString = today.getFullYear() + "-" + getMonth + "-" +  getDay;
  
    return todayString;
}

function getPreviousDayMinusNOM(numberOfMonths)
{
  var previousDayDate = new Date();
  previousDayDate.setDate(previousDayDate.getDate()-1);
  previousDayDate.setMonth(previousDayDate.getMonth()- numberOfMonths);
  
  var getDay = "";
   var getMonth = "";
   if(previousDayDate.getDay() < 10)
   {
     getDay = "0" + previousDayDate.getDay();
   }
   else 
   {
     getDay =  previousDayDate.getDay();
   }
   
   if(previousDayDate.getMonth() < 10)
   {
     getMonth = "0" + previousDayDate.getMonth();
   }
   else 
   {
      getMonth = previousDayDate.getMonth();
   }
   
   previousDayDateString = previousDayDate.getFullYear() + "-" + getMonth + "-" +  getDay;
   
   return previousDayDateString;
}
