$(window).load(function() {
  $('body').addClass('loaded');
});
// Go to content from hero
$(document).on('click', '.nav-item a, .cta-container a', function(){
  $("html, body").animate({ scrollTop: $('.section.' + $(this).attr('data-target')).offset().top }, 500);
});