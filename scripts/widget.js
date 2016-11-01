if ( getUrlParameter('publisher') === undefined ) {
  var publisher = 'mylocal.sun-sentinel.com';
} else { 
  var publisher = getUrlParameter('publisher');
};

if ( getUrlParameter('width') === undefined ) {
  var width = '300';
} else { 
  var width = getUrlParameter('width');
};
      
if ( getUrlParameter('height') === undefined ) {
  var height = '600';
} else { 
  var height = getUrlParameter('height');
};

if ( getUrlParameter('adcentric') === 'true' ) {
  var defaultView = 'ads';
  var adcentric = 'true';
} else { 
  var defaultView = 'businesses';
  var adcentric = 'false';
};

function updateIframeSrc() {
  $('.ownlocal-widget iframe').attr( 'src', 'http://' + publisher + '/embed?adcentric=' + adcentric );
};

function updateEmbedCode() {
  $('.code').html('&lt;var id="ownlocal"&gt;&lt;script id="ownlocal-script" data-active="' + defaultView + '" src="http://' + publisher + '/embed.js?h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

$(document).ready(function() {
  updateIframeSrc();
  $('#platform-url').val(publisher);
  $('#custom-width').val(width);
  $('#custom-height').val(height);
  $('.ownlocal-widget').css("width", width).css("height", height);
  $('#ownlocal').css("width", "auto");
  if ( getUrlParameter('adcentric') === 'true' ) {
    $('#default-view .selection').html('Ads');
    $('.default-ads-button').addClass('active');
  } else { 
    $('#default-view .selection').html('Businesses');
    $('.default-businesses-button').addClass('active');
  };
  if ( getUrlParameter('width') === undefined ) {
    $('#widget-size .selection').html(width + 'x' + height);
  } else { 
    $('#widget-size .selection').html('Custom');
  };
  if ( getUrlParameter('height') === undefined ) {
    $('#widget-size .selection').html(width + 'x' + height);
  } else { 
    $('#widget-size .selection').html('Custom');
  };
});

$(document).on('click', '.dropdown.widget-size-dropdown .button', function(){
  width = (this).dataset.width;
  height = (this).dataset.height;
  $('.ownlocal-widget').css("width", width).css("height", height);
  $('#ownlocal').css("width", "auto");
  $(this).addClass('active');
  $('.dropdown.widget-size-dropdown .button').not(this).removeClass('active');
  $('#widget-size .selection').html(width + 'x' + height);
  $('input#custom-width').val(width);
  $('input#custom-height').val(height);
  updateEmbedCode();
});


$(document).on('keyup keydown', 'input#platform-url', function(){
  publisher = $(this).val();
  $('.ownlocal-widget').css("width", width);
  updateIframeSrc();
  updateEmbedCode();
});

$(document).on('keyup keydown click blur change', 'input#custom-width', function(){
  width = $(this).val();
  $('.ownlocal-widget').css("width", width);
  $('#ownlocal').css("width", "auto");
  $('#widget-size .selection').html('Custom');
  $('.dropdown.widget-size-dropdown .button').removeClass('active');
  updateEmbedCode();
});

$(document).on('keyup keydown click blur change', 'input#custom-height', function(){
  height = $(this).val();
  $('.ownlocal-widget').css("height", height);
  $('#widget-size .selection').html('Custom');
  $('.dropdown.widget-size-dropdown .button').removeClass('active');
  updateEmbedCode();
});

$(document).on('click', '.dropdown.default-view-dropdown .button', function(){
  selection = (this).dataset.selection;
  $(this).addClass('active');
  $('.dropdown.default-view-dropdown .button').not(this).removeClass('active');
  $('#default-view .selection').html(selection);
  updateEmbedCode();
});

$(document).on('click', '.default-ads-button', function(){
  defaultView = 'ads';
  adcentric = 'true';
  updateEmbedCode();    
  updateIframeSrc();
});
$(document).on('click', '.default-businesses-button', function(){
  defaultView = 'businesses';
  adcentric = 'false';
  updateEmbedCode();       
  updateIframeSrc();
});

// Populate widgets
$(function() {
  $('.ownlocal-widget').html($('.ownlocal-widget').html().replace("PLATFORM-URL", publisher));
  updateEmbedCode();
});