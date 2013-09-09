function callKey()
{
  
  symbol = $('#stockDropDown').val();
  //Singapore Symbol has a .SI at the back
  var query = "select * from yahoo.finance.keystats where symbol in ('"+ symbol + ".SI')";
  key(query);
 
}
function key(query)
{
   $.get("/Key?Query="+ query, function(data) {
  
         var mydata = jQuery.parseJSON( data );
  
    
         strKey = "<table align=\"center\"  width=\"100%\">";
         strKey = strKey + "<tr><th>Market Cap:</th><th>" + mydata.query.results.stats.MarketCap.content  + "</th><tr>";
          strKey = strKey + "<tr><th>Enterprise Value:</th><th>" + mydata.query.results.stats.EnterpriseValue.content + "</th><tr>";
         strKey = strKey + "<tr><th>Trailing PE:</th><th>" + mydata.query.results.stats.TrailingPE.content + "</th><tr>";
         strKey = strKey + "<tr><th>Forward PE:</th><th>" + mydata.query.results.stats.ForwardPE.content + "</th><tr>";
         strKey = strKey + "<tr><th>REG Ratio:</th><th>" + mydata.query.results.stats.PEGRatio.content + "</th><tr>";
         strKey = strKey + "<tr><th>Price Sales:</th><th>" + mydata.query.results.stats.PriceSales.content + "</th><tr>";
         strKey = strKey + "<tr><th>Price Book:</th><th>" + mydata.query.results.stats.PriceBook.content + "</th><tr>";
         strKey = strKey + "<tr><th>Enterprise Value Revenue:</th><th>" + mydata.query.results.stats.EnterpriseValueRevenue.content + "</th><tr>";
         strKey = strKey + "<tr><th>Enterprise Value EBITDA:</th><th>" + mydata.query.results.stats.EnterpriseValueEBITDA.content + "</th><tr>";
         strKey = strKey + "<tr><th>Most Recent Quarter:</th><th>" + mydata.query.results.stats.MostRecentQuarter.content + "</th><tr>";
         strKey = strKey + "<tr><thProfit Margin:</th><th>" + mydata.query.results.stats.ProfitMargin.content + "</th><tr>";
         strKey = strKey + "<tr><th>Operating Margin:</th><th>" + mydata.query.results.stats.OperatingMargin.content + "</th><tr>";
         strKey = strKey + "<tr><th>Return On Assets:</th><th>" + mydata.query.results.stats.ReturnonAssets.content + "</th><tr>";
         strKey = strKey + "<tr><th>Return On Equity:</th><th>" + mydata.query.results.stats.ReturnonEquity.content + "</th><tr>"
         strKey = strKey + "<tr><th>Revenue:</th><th>" + mydata.query.results.stats.Revenue.content + "</th><tr>";
         strKey = strKey + "<tr><th>Revenue Per Share:</th><th>" + mydata.query.results.stats.RevenuePerShare.content + "</th><tr>";
         strKey = strKey + "<tr><th>Quartly Revenue Growth:</th><th>" + mydata.query.results.stats.QtrlyRevenueGrowth.content + "</th><tr>";
         strKey = strKey + "<tr><th>Gross Profit:</th><th>" + mydata.query.results.stats.GrossProfit.content + "</th><tr>";
         strKey = strKey + "<tr><th>EBITDA:</th><th>" + mydata.query.results.stats.EBITDA.content + "</th><tr>";
          strKey = strKey + "<tr><th>Net Income Average To Common:</th><th>" + mydata.query.results.stats.NetIncomeAvltoCommon.content + "</th><tr>";
         strKey = strKey + "<tr><th>Diluted EPS:</th><th>" + mydata.query.results.stats.DilutedEPS.content + "</th><tr>";
          strKey = strKey + "<tr><th>Quarterly Earning Growth:</th><th>" + mydata.query.results.stats.QtrlyEarningsGrowth.content + "</th><tr>";
         strKey = strKey + "<tr><th>Total Cash:</th><th>" + mydata.query.results.stats.TotalCash.content + "</th><tr>";       
          strKey = strKey + "<tr><th>Total Cash Per Share:</th><th>" + mydata.query.results.stats.TotalCashPerShare.content + "</th><tr>";  
         strKey = strKey + "<tr><th>Total Debt:</th><th>" + mydata.query.results.stats.TotalDebt.content + "</th><tr>";  
         strKey = strKey + "<tr><th>Total Debt Equity:</th><th>" + mydata.query.results.stats.TotalDebtEquity.content + "</th><tr>";
strKey = strKey + "<tr><th>Current Ratio:</th><th>" + mydata.query.results.stats.CurrentRatio.content + "</th><tr>";
strKey = strKey + "<tr><th>book Value Per Share:</th><th>" + mydata.query.results.stats.BookValuePerShare.content + "</th><tr>";
strKey = strKey + "<tr><th>Operating Cash Flow:</th><th>" + mydata.query.results.stats.OperatingCashFlow.content + "</th><tr>";
strKey = strKey + "<tr><th>Levered Free Cash Flow:</th><th>" + mydata.query.results.stats.LeveredFreeCashFlow.content + "</th><tr>";
strKey = strKey + "<tr><th>52 Weeks High:</th><th>" + mydata.query.results.stats.p_52_WeekHigh.content + "</th><tr>";
strKey = strKey + "<tr><th>52 Weeks Low:</th><th>" + mydata.query.results.stats.p_52_WeekLow.content + "</th><tr>";

strKey = strKey + "<tr><th>5 year Average Dividend Yield:</th><th>" + mydata.query.results.stats.p_5YearAverageDividendYield  + "</th><tr>";
strKey = strKey + "<tr><th>Payout Ratio:</th><th>" + mydata.query.results.stats.PayoutRatio  + "</th><tr>";
strKey = strKey + "<tr><th>Dividend Date:</th><th>" + mydata.query.results.stats.DividendDate + "</th><tr>";
strKey = strKey + "<tr><th>Ex Dividend Date:</th><th>" + mydata.query.results.stats.Ex_DividendDate + "</th><tr>";

         strKey = strKey + "</table>";

        
        $('#KeyContents').html(strKey);

  });
}
