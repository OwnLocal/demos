// Body classes
$(window).load(function() {
  $('body').addClass('loaded');
  if (window.location.href.indexOf("?generic=true") > -1) {
    $("body").addClass("generic");
    $('.cover-wrapper').css('background-image', '');
  }
});

// Go to content from hero
$(document).on('click', '.nav-item a, .cta-container a, .navigation a', function() {
  $("html, body").animate({
    scrollTop: $('.section.' + $(this).attr('data-target')).offset().top
  }, 500);
});

// Go to top
$(document).on('click', '.go-to-top', function() {
  $("html, body").animate({
    scrollTop: 0
  }, 500);
  return false;
});

$(document).ready(function() {
  // Show go to top
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 100) {
      $(".go-to-top").show();
    } else {
      $(".go-to-top").hide();
    }
  });
  // Photo gallery
  $(".photo-gallery .thumbs img").on("click", function() {
    $('.active-image').show();
    $('.active-image img').attr('src', $(this).attr('data-src').replace('.thumbs', 'large'));
    $('body').addClass('overflow--hidden');
  });
  $(".photo-gallery .photo-gallery-close").on("click", function() {
    $('.active-image').hide();
    $('body').removeClass('overflow--hidden');
  });
  $(".active-image").on("click", function() {
    $(this).hide();
    $('body').removeClass('overflow--hidden');
  });
});

// Close with ESC
$(document).keyup(function(e) {
  if (e.keyCode === 27) {
    $('body').removeClass('overflow--hidden');
    $('.photo-gallery .active-image').hide();
  }
});