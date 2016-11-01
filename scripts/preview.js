$(document).ready(function() {

  if ( getUrlParameter('website') === undefined ) {
    var website = 'local.tennessean.com';
  } else { 
    var website = getUrlParameter('website');
  };
  
  if ( getUrlParameter('fullscreen') === 'true' ) {
    var fullscreen = 'true';
  } else { 
    var fullscreen = 'false';
  };
  
  if ( getUrlParameter('desktop-only') === 'true' ) {
    var phoneless = 'true';
  } else { 
    var phoneless = 'false';
  };

  function updateBrowserURL() {
    window.history.replaceState(null, null, "?website=" + website + "&fullscreen=" + fullscreen + "&desktop-only=" + phoneless);    
  }

  if( window.location.href.indexOf("?") > -1 ) {
  } else {
    updateBrowserURL();
  };
  
  function fullscreenToggle() {
    $('body').toggleClass('hidden-header');
    $('.fullscreen').toggleClass('active');
    if ( fullscreen === 'false' ){
      fullscreen = 'true';
    } else {
      fullscreen = 'false';      
    }
  };
  
  function updateIframeSrc() {
    $('iframe').attr( 'src', 'http://' + website );  
    updateBrowserURL();
  };
  
  function desktopView() {
    $('body').addClass('minimized-phone');
    $('.desktop-view').addClass('active');
    $('.devices-view').removeClass('active');
    $('.wrapper').removeClass('scaled');
    phoneless = 'true';
  }
  
  function devicesView() {
    $('body').removeClass('minimized-phone');
    $('.devices-view').addClass('active');
    $('.desktop-view').removeClass('active');        
    $('.wrapper').addClass('scaled');
    phoneless = 'false';
  }

  updateIframeSrc();
  $('#platform-url').val(website);

  if ( getUrlParameter('fullscreen') === 'true' ) {
    fullscreenToggle();
  };

  if ( getUrlParameter('desktop-only') === 'true' ) {
    desktopView();
  };

  $('input#platform-url').keydown(function (e){
    if(e.keyCode == 13){
      website = $(this).val();
      updateIframeSrc();
      $('.bookmarks').removeClass('active');
    }
  })

  $('input#platform-url').on('focus', function(){
    $('.bookmarks').addClass('active');
  });
  
  $('.bookmark').on('click', function(){
    $('input#platform-url').val($(this).attr('data-url'));
    website = $(this).attr('data-url');
    updateIframeSrc();
    $('.bookmarks').removeClass('active');
  });
  
  $('.outer-wrapper, .preview-icons, iframe').on('click', function(){
    $('.bookmarks').removeClass('active');
  });
  
  $('.fullscreen').on('click', function(){
    fullscreenToggle();
    updateBrowserURL();
  });
  
  $('.desktop-view').on('click', function(){
    desktopView();
    updateBrowserURL();
  });
  
  $('.devices-view').on('click', function(){
    devicesView();
    updateBrowserURL();
  });

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