// Go to content from hero
$(document).on('click', '.hero-to-content', function(){
  $("html, body").animate({ scrollTop: $('#products').offset().top }, 500);
});