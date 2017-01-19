// Body classes
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

// Go to top
$(document).on('click', '.go-to-top', function(){
  $("html, body").animate({ scrollTop: 0 }, 500);
  return false;
});

// Show go to top
$(document).ready(function() {
 	$(window).on("scroll", function () {
    if ($(this).scrollTop() > 100) {
      $(".go-to-top").show();
    }
    else {
      $(".go-to-top").hide();
    }
  });
});