function announcements()
{
  $.get("/announcements?StockName="+ getSelectedText('stockDropDown'), function(data) {
  
   var mydata = jQuery.parseJSON( data );
   $('#announcementTable').dataTable().fnClearTable()   
    
   for(var i=0;i<mydata.items.length-1;i++)
   {
      
       $('#announcementTable').dataTable().fnAddData( [
         mydata.items[i].key,
         mydata.items[i].Date,
         mydata.items[i].Time,
         mydata.items[i].IssuerName,
         mydata.items[i].AnnType,
         mydata.items[i].AnnTitle] );
   }
   callYQL();
   //callKey();
   callChart(document.getElementById("monthDropDown").value);
  });
  
}