// Go to content from hero
$(document).on('click', '.hero-to-content', function(){
  $("html, body").animate({ scrollTop: $('.home-grid').offset().top }, 500);
});