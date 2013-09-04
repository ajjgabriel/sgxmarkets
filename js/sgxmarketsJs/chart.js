function chart(query)
{
 var jsonArray = new Array();
 encodedQuery = encodeURIComponent(query);

 $.get('http://query.yahooapis.com/v1/public/yql?q='
                     + encodedQuery +"&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=", function(data) {
     
     
     jsonArray = new Array();
     for (var key in data.query.results.quote)
      {
      
               jsonArray[key] =  ["'" + data.query.results.quote[key].date + "'", parseFloat(data.query.results.quote[key].Close)];

      }   
     buildChart(jsonArray);
  });
  
  function buildChart(jsonArray)
  {

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
 

}