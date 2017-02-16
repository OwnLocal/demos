// Body classes
$(window).load(function() {
  $('body').addClass('loaded');
});

// Go to content from hero
$(document).on('click', '.hero button', function() {
  $("html, body").animate({
    scrollTop: $('.section.' + $(this).attr('data-target')).offset().top
  }, 500);
});