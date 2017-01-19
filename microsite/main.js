$(window).load(function() {
  $('body').addClass('loaded');
  if(window.location.href.indexOf("?generic=true") > -1) {
    $("body").addClass("generic");
  }
});
// Go to content from hero
$(document).on('click', '.nav-item a, .cta-container a', function(){
  $("html, body").animate({ scrollTop: $('.section.' + $(this).attr('data-target')).offset().top }, 500);
});