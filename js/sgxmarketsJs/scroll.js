$(document).ready(function() {

 
	// When #announcementScroll is clicked
	jQuery('#announcementScroll').click(function(){
		// Scroll down to 'catTopPosition'
		jQuery('html, body').animate({scrollTop:0}, 'slow');
		// Stop the link from acting like a normal anchor link
		return false;
	});

 
  var fundamentalsPosition = jQuery('#Fundamentals').offset().top;
	
	// When #scroll is clicked
	jQuery('#fundamentalScroll').click(function(){
		// Scroll down to 'catTopPosition'
		jQuery('html, body').animate({scrollTop:fundamentalsPosition}, 'slow');
		// Stop the link from acting like a normal anchor link
		return false;
	});
});
