function hideNavigation() {
  $('.wrapper').removeClass('nav-on');
  $('#nav').removeClass('nav-on');
}

// Show header search
$(document).on('click', '#search-toggle', function(){
  $('#header-search').addClass('block');
  $('.home-search').addClass('block');
  $('body.embed #search-toggle').removeClass('block');
});

// Show header nav
$(document).on('click', '#nav-toggle', function(){
  $('.wrapper').toggleClass('nav-on');
  $('#nav').toggleClass('nav-on');
});

// Hide header nav
$(document).on('click', '.wrapper.nav-on, .add-business a', function(){
  hideNavigation();
});

// Toggle nav with ESC key
$(document).keyup(function(e) {
  if (e.keyCode == 27) {
    $('.wrapper').removeClass('nav-on');
    $('#nav').removeClass('nav-on');
    $('.photo-gallery .active-image').hide();
  }
});

// Hide header search when close button gets clicked
$(document).on('click', '.close-button', function(){
  $('#header-search').removeClass('block');
  $('.home-search').removeClass('block');
  $('body.embed #search-toggle').addClass('block');
  hideNavigation();
});

// Hide header search when clicking on other parts of site
$(document).on('blur', '#header-search input', function(){
  $('#header-search').removeClass('block');
});

// Toggle promo max height
$(document).on('click', '#content.promo-content .promo-wrapper img.render-type-image', function(){
  $(this).toggleClass('enlarged');
});

// Toggle promo text
$(document).on('click', '.promo-text-toggle', function(){
  $(this).toggleClass('open');
  $('.promo-text').toggle();
});

// Go to top link in footer
$(document).on('click', '.back-to-top', function(){
  $("html, body").animate({ scrollTop: 0 }, 500);
  return false;
});

// Go to content from hero
$(document).on('click', '.hero-to-content', function(){
  $("html, body").animate({ scrollTop: $('#content.home-content .invisible-container').offset().top }, 500);
});

// Go to article title to content
$(document).on('click', '#content.native-content #main-column .article-title h1', function(){
  $("html, body").animate({ scrollTop: $('#content.native-content #main-column .article-title').offset().top }, 500);
});

// Large promo images now load in a nicer way
$(window).load(function() {
  $('#content.promo-content .promo-wrapper img.render-type-image').addClass('loaded');
});

// Show truncated text
$(document).on('click', '.expandable', function(){
  $(this).removeClass();
  $(this).children('.truncated').hide();
  $(this).children('.full').show();
});

$(document).ready(function() {
    // Hide broken stuff?
    $('img').error(function(){
        $(this).hide();
    });

    // Load random Sidengo site in sidebar
    var sites = new Array("http://sidengo.com/classic", "http://sidengo.com/broadway", "http://sidengo.com/madison", "http://sidengo.com/arctic", "http://sidengo.com/centric_transparent"),
    randomsite = sites[Math.floor( Math.random() * sites.length )];
    $('.sidengo-promo iframe').attr('src', randomsite );

    // Activate the new business box if coming from the widget "Claim Business" feature
    if (location.hash.match(/^#add_business$/)) {
      $('#btn-add-business').click();
    }

    $("#contact-form").submit(function(e) {
      var form = $(this);
      e.preventDefault();

      $.ajax({
        method: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        beforeSend: function() {
          $('#result-message').empty();
        }
      }).done(function(data) {
        $('#result-message').text(data.message).removeClass('error').addClass('success');
      }).fail(function(data) {
        $('#result-message').text(data.responseText).addClass('error').removeClass('success');
      });
    });
});

// Add current page URL at the end of share links
var currentPageUrl = $(location).attr('href');
$(function(){
  $('.share-box a').each(function(){
    $(this).attr('href', $(this).attr('href')+currentPageUrl);
  });
});

// Ad current page URl to articles share box
$(function(){
  $('.article-footer-box input').val(currentPageUrl);
});

// Embed Tabs

$('ul.tabs').each(function(){
  // For each set of tabs, we want to keep track of which tab is active and its associated content
  var $active, $content, $links = $(this).find('a');

  // If the location.hash matches one of the links, use that as the active tab. If no match is found, use the first link as the initial active tab.
  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
  $active.addClass('active');

  $content = $($active[0].hash);

  // Hide the remaining content
  $links.not($active).each(function () {
    $(this.hash).hide();
  });

  // Bind the click event handler
  $(this).on('click', 'a', function(e){
    // Make the old tab inactive.
    $active.removeClass('active');
    $content.hide();

    // Update the variables with the new link and content
    $active = $(this);
    $content = $(this.hash);

    // Make the tab active.
    $active.addClass('active');
    $content.show();

    // Prevent the anchor's default click action
    e.preventDefault();
  });
});

// Business photo gallery
$(".photo-gallery .thumbs img").on("click", function(){
  $('.active-image').show();
  $('.active-image img').attr('src', $(this).attr('data-src').replace('.thumbs', 'large'));
});
$(".photo-gallery .photo-gallery-close").on("click", function(){
  $('.active-image').hide();
});
$(".active-image").on("click", function(){
  $(this).hide();
});

// Detect if browser is on mobile or desktop
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
  if(jQuery.browser.mobile) {
    $('body').addClass('mobile');
  }
  else {
    $('body').addClass('desktop');
  }


/* DELETE ONCE IT'S BEING USED */
$(document).on('click', '.toggle-native-hero', function(){
  $('#content.native-content').toggleClass('no-hero');
});
