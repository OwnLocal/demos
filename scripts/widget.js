if ( getUrlParameter('publisher') === undefined ) {
  var publisher = 'mylocal.sun-sentinel.com';
} else { 
  var publisher = getUrlParameter('publisher');
};

if ( getUrlParameter('partner') === undefined ) {
  var partner = '8fd7e5a6-d514-4c50-b469-a93c27980b27';
} else { 
  var partner = getUrlParameter('partner');
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

  $('.dropdown').on('click', function(){
    $(this).toggleClass('active');
    $('.dropdown').not(this).removeClass('active');
  });
  $('.outer-wrapper, input').on('click', function(){
    $('.dropdown').removeClass('active');
  });

  $('.dropdown.widget-size-dropdown .button').on('click', function(){
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

  $('input#platform-url').on('keydown', function(e){
    if(e.keyCode == 13){
      publisher = $(this).val();
      $('.ownlocal-widget').css("width", width);
      updateIframeSrc();
      updateEmbedCode();
    }
  });

  $('input#custom-width').on('keyup keydown click blur change', function(){
    width = $(this).val();
    $('.ownlocal-widget').css("width", width);
    $('#ownlocal').css("width", "auto");
    $('#widget-size .selection').html('Custom');
    $('.dropdown.widget-size-dropdown .button').removeClass('active');
    updateEmbedCode();
  });

  $('input#custom-height').on('keyup keydown click blur change', function(){
    height = $(this).val();
    $('.ownlocal-widget').css("height", height);
    $('#widget-size .selection').html('Custom');
    $('.dropdown.widget-size-dropdown .button').removeClass('active');
    updateEmbedCode();
  });

  $('.dropdown.default-view-dropdown .button').on('click', function(){
    selection = (this).dataset.selection;
    $(this).addClass('active');
    $('.dropdown.default-view-dropdown .button').not(this).removeClass('active');
    $('#default-view .selection').html(selection);
    updateEmbedCode();
  });

  $('.default-ads-button').on('click', function(){
    defaultView = 'ads';
    adcentric = 'true';
    updateEmbedCode();    
    updateIframeSrc();
  });

  $('.default-businesses-button').on('click', function(){
    defaultView = 'businesses';
    adcentric = 'false';
    updateEmbedCode();       
    updateIframeSrc();
  });

});

// Populate widgets
$(function() {
  $('.ownlocal-widget').html($('.ownlocal-widget').html().replace("PLATFORM-URL", publisher));
  updateEmbedCode();
});