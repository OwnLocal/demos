// Go to content from hero
$(document).on('click', '.hero button', function() {
  $("html, body").animate({
    scrollTop: $('.section.' + $(this).attr('data-target')).offset().top
  }, 500);
});

// Add class to body when cover view is no longer in viewport
$(window).scroll(function() {    
  var scroll = $(window).scrollTop();    
  if (scroll >= $(window).height()) {
    $("body").addClass("scrolled");
  } else {
    $("body").removeClass("scrolled");
  }
});