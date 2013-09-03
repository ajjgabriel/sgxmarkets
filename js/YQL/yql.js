function YQLQuery(query) {

   var stringFundamentals = ""
   var stringChange = ""
   var stringChangeColor = "White"
   encodedQuery = encodeURIComponent(query.toLowerCase());
   //alert(encodedQuery);
   $.get('http://query.yahooapis.com/v1/public/yql?q='
                     + encodedQuery + '&format=json&&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function(data) {
   
       stringChange = data.query.results.quote.Change;
       
       if(stringChange.charAt(0) == '-')
       {
         stringChangeColor = "Red"
       }
       else if(stringChange.charAt(0) == '+'){
          stringChangeColor = "Green"
       }
   
       stringFundamentals = "<table align=\"Centre\" width=\"100%\">";
       stringFundamentals = stringFundamentals + "<tr><th>Symbol</th><th>" + data.query.results.quote.symbol + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>DaysRange:</th><th>" + data.query.results.quote.DaysRange + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>AverageDailyVolume:</th><th>" + data.query.results.quote.AverageDailyVolume+ "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr  bgcolor=\""+ stringChangeColor +"\"><th>Change:</th><th>" + stringChange + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>DaysLow:</th><th>" + data.query.results.quote.DaysLow + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>DaysHigh:</th><th>" + data.query.results.quote.DaysHigh + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>LastTradePriceOnly:</th><th>" + data.query.results.quote.LastTradePriceOnly + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>MarketCapitalization:</th><th>" + data.query.results.quote.MarketCapitalization + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>Name:</th><th>" + data.query.results.quote.Name + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>StockExchange:</th><th>" + data.query.results.quote.StockExchange + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>Volume:</th><th>" + data.query.results.quote.Volume + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>YearLow:</th><th>" + data.query.results.quote.YearLow + "</th></tr>";
       stringFundamentals = stringFundamentals + "<tr><th>YearHigh:</th><th>" + data.query.results.quote.YearHigh + "</th></tr>";
       stringFundamentals = stringFundamentals + "</table>";
       
       $("#FundamentalContents").html(stringFundamentals);
  }); 
        
}
