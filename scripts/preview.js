if ( getUrlParameter('website') === undefined ) {
  var website = 'local.tennessean.com';
} else { 
  var website = getUrlParameter('website');
};

if ( getUrlParameter('fullscreen') === true ) {
  var fullscreen = 'true';
} else { 
  var fullscreen = 'false';
};

if ( getUrlParameter('desktop-only') === true ) {
  var phoneless = 'true';
} else { 
  var phoneless = 'false';
};

function fullscreenToggle() {
  $('body').toggleClass('hidden-header');
  $('.fullscreen').toggleClass('active');        
};

function updateIframeSrc() {
  $('iframe').attr( 'src', 'http://' + website );  
};

function desktopView() {
  $('body').addClass('minimized-phone');
  $('.desktop-view').addClass('active');
  $('.devices-view').removeClass('active');
  $('.wrapper').removeClass('scaled');        
}

function devicesView() {
  $('body').removeClass('minimized-phone');
  $('.devices-view').addClass('active');
  $('.desktop-view').removeClass('active');        
  $('.wrapper').addClass('scaled');        
}

$(document).ready(function() {
  updateIframeSrc();
  $('#platform-url').val(website);

  if ( getUrlParameter('fullscreen') === 'true' ) {
    fullscreenToggle();
  };

  if ( getUrlParameter('desktop-only') === 'true' ) {
    desktopView();
  };

});

$(document).on('keyup keydown', 'input#platform-url', function(){
  website = $(this).val();
  updateIframeSrc();
});

$(document).on('click', '.fullscreen', function(){
  fullscreenToggle();
});

$(document).on('click', '.desktop-view', function(){
  desktopView();
});

$(document).on('click', '.devices-view', function(){
  devicesView();
});

//Show Dimensions
$(document).on('click', '.show-dimensions', function(){
  $('.browser-dimensions').toggle();
});
// Change browser dimensions on resize
function jsUpdateSize() {
  var width = document.getElementById('browser').offsetWidth;
  var height = document.getElementById('browser').offsetHeight - 30;
  document.getElementById('browser-width').innerHTML = width;
  document.getElementById('browser-height').innerHTML = height;
};
window.onload = jsUpdateSize;
window.onresize = jsUpdateSize;
window  .onclick = jsUpdateSize;