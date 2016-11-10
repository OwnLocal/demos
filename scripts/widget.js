var type = getUrlParameter('type') || 'standard',
    publisher = getUrlParameter('publisher') || 'mylocal.statesman.com',
    partner = getUrlParameter('partner') || 'be65ee41-1997-4ab3-8f12-0b0f5a183ef2',
    width = getUrlParameter('width') || '300',
    height = getUrlParameter('height') || '600',
    minFeaturedLevel = getUrlParameter('min-featured-level') || '0',
    category = getUrlParameter('category') || 'all',
    subcategory = getUrlParameter('subcategory') || 'all',
    customCss = $('#custom-css').val() || '',
    plainTextCss = '';

if (getUrlParameter('adcentric') === 'true') {
  var defaultView = 'ads';
  var adcentric = 'true';
} else {
  var defaultView = 'businesses';
  var adcentric = 'false';
};

function updateBrowserURL() {
  var publisherOrPartner = (type === 'secure') ? `&partner=${partner}` : `&publisher=${publisher}`;
  window.history.replaceState(null, null, `?type=${type}${publisherOrPartner}&width=${width}&height=${height}&adcentric=${adcentric}&min-featured-level=${minFeaturedLevel}&category=${category}&subcategory=${subcategory}`);
};

function updateIframeSrc() {
  $('.ownlocal-widget.standard iframe').attr('src', `http://${publisher}/embed?adcentric=${adcentric}&min_featured_level=${minFeaturedLevel}&category=${category}&subcategory=${subcategory}&custom_css=${customCss}` );
};

function updateSecureIframeSrc() {
  $('.ownlocal-widget.secure iframe').attr('src', `https://widget.secure.ownlocal.com/embed/${partner}?adcentric=${adcentric}&min_featured_level=${minFeaturedLevel}&category=${category}&subcategory=${subcategory}&custom_css=${customCss}`);
};

function updateEmbedCode() {
  $('.code').html(`&lt;var id="ownlocal"&gt;&lt;script id="ownlocal-script" data-active="${defaultView}" src="http://${publisher}/embed.js?h=${height}&min_featured_level=${minFeaturedLevel}&category=${category}&subcategory=${subcategory}"&gt;&lt;/script&gt;&lt;/var&gt;`);
};

function updateSecureEmbedCode() {
  $('.code.secure').html(`&lt;var id="ownlocal"&gt;&lt;script async id="ownlocal-script" data-active="${defaultView}" src="https://widget.secure.ownlocal.com/embed.js?uuid=${partner }&?h=${height}&min_featured_level=${minFeaturedLevel}&category=${category}&subcategory=${subcategory}"&gt;&lt;/script&gt;&lt;/var&gt;`);
};

$(document).ready(function() {

  if(window.location.href.indexOf("?") > -1) {
  } else {
    updateBrowserURL();
  };

  $('#category').val(category);
  $('#subcategory').val(subcategory);

  updateIframeSrc();
  updateSecureIframeSrc();
  $('#platform-url').val(publisher);
  $('#partner-uuid').val(partner);
  $('#custom-width').val(width);
  $('#custom-height').val(height);
  $('.ownlocal-widget').css("width", width).css("height", height);
  $('#ownlocal').css("width", "auto");

  if (getUrlParameter('type') === 'secure') {
    $('#widget-type .selection').html('Secure');
    $('.secure-widget-button').addClass('active');
    $('body').addClass('secure-widget');
    $('body').removeClass('standard-widget');
  } else {
    $('#widget-type .selection').html('Standard');
    $('.standard-widget-button').addClass('active');
    $('body').addClass('standard-widget');
    $('body').removeClass('secure-widget');
  };

  if (getUrlParameter('width') === undefined) {
    $('#widget-size .selection').html(width + 'x' + height);
  } else {
    $('#widget-size .selection').html('Popular Sizes');
  };
  if (getUrlParameter('height') === undefined) {
    $('#widget-size .selection').html(width + 'x' + height);
  } else {
    $('#widget-size .selection').html('Popular Sizes');
  };
  if (getUrlParameter('adcentric') === 'true') {
    $('#default-view .selection').html('Ads');
    $('.default-ads-button').addClass('active');
  } else {
    $('#default-view .selection').html('Businesses');
    $('.default-businesses-button').addClass('active');
  };
  if (getUrlParameter('min-featured-level') === undefined) {
    $('#min-featured-level .selection').html('None');
    $('.no-min-featured-level-button').addClass('active');
  }
  if (getUrlParameter('min-featured-level') === '0') {
    $('#min-featured-level .selection').html('None');
    $('.no-min-featured-level-button').addClass('active');
  }
  if (getUrlParameter('min-featured-level') === '1') {
    $('#min-featured-level .selection').html('Level 1');
    $('.min-featured-level-one-button').addClass('active');
  }
  if (getUrlParameter('min-featured-level') === '2') {
    $('#min-featured-level .selection').html('Level 2');
    $('.min-featured-level-two-button').addClass('active');
  }
  if (getUrlParameter('min-featured-level') === '3') {
    $('#min-featured-level .selection').html('Level 3');
    $('.min-featured-level-three-button').addClass('active');
  }

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
    $('input#custom-width').val(width);
    $('input#custom-height').val(height);
    updateEmbedCode();
    updateSecureEmbedCode();
    updateBrowserURL();
  });

  $('input#platform-url').on('keydown', function(e){
    if(e.keyCode == 13){
      publisher = $(this).val();
      updateIframeSrc();
      updateSecureIframeSrc();
      updateEmbedCode();
      updateSecureEmbedCode();
      updateBrowserURL();
    }
  });

  $('input#partner-uuid').on('keydown', function(e){
    if(e.keyCode == 13){
      partner = $(this).val();
      updateIframeSrc();
      updateSecureIframeSrc();
      updateEmbedCode();
      updateSecureEmbedCode();
      updateBrowserURL();
    }
  });

  $('input#custom-width').on('keyup keydown click blur change', function(){
    width = $(this).val();
    $('.ownlocal-widget').css("width", width);
    $('#ownlocal').css("width", "auto");
    $('#widget-size .selection').html('Popular Sizes');
    $('.dropdown.widget-size-dropdown .button').removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateBrowserURL();
  });

  $('input#custom-height').on('keyup keydown click blur change', function(){
    height = $(this).val();
    $('.ownlocal-widget').css("height", height);
    $('#widget-size .selection').html('Popular Sizes');
    $('.dropdown.widget-size-dropdown .button').removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateBrowserURL();
  });

  $('input#category').on('keydown', function(e){
    if(e.keyCode == 13){
      categoryValue = $(this).val();
      if(categoryValue === '') {
        category = 'all';
      } else {
        category = categoryValue;
      };
      updateIframeSrc();
      updateSecureIframeSrc();
      updateEmbedCode();
      updateSecureEmbedCode();
      updateBrowserURL();
    }
  });

  $('input#subcategory').on('keydown', function(e){
    if(e.keyCode == 13){
      subCategoryValue = $(this).val();
      if(subCategoryValue === '') {
        subcategory = 'all';
      } else {
        subcategory = subCategoryValue;
      };
      updateIframeSrc();
      updateSecureIframeSrc();
      updateEmbedCode();
      updateSecureEmbedCode();
      updateBrowserURL();
    }
  });

  $('.dropdown .button').on('click', function(){
    selection = (this).dataset.selection;
    $(this).addClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateBrowserURL();
  });

  $('.standard-widget-button').on('click', function(){
    type = 'standard';
    $('body').addClass('standard-widget');
    $('body').removeClass('secure-widget');
    $('#widget-type .selection').html('Standard');
    $('.dropdown.widget-type-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  $('.secure-widget-button').on('click', function(){
    type = 'secure';
    $('body').addClass('secure-widget');
    $('body').removeClass('standard-widget');
    $('#widget-type .selection').html('Secure');
    $('.dropdown.widget-type-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  $('.default-ads-button').on('click', function(){
    defaultView = 'ads';
    adcentric = 'true';
    $('#default-view .selection').html('Ads');
    $('.dropdown.default-view-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  $('.default-businesses-button').on('click', function(){
    defaultView = 'businesses';
    adcentric = 'false';
    $('#default-view .selection').html('Businesses');
    $('.dropdown.default-view-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
  });

  $('.no-min-featured-level-button').on('click', function(){
    minFeaturedLevel = '0';
    $('#min-featured-level .selection').html('None');
    $('.dropdown.min-featured-level-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  $('.min-featured-level-one-button').on('click', function(){
    minFeaturedLevel = '1';
    $('#min-featured-level .selection').html('Level 1');
    $('.dropdown.min-featured-level-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  $('.min-featured-level-two-button').on('click', function(){
    minFeaturedLevel = '2';
    $('#min-featured-level .selection').html('Level 2');
    $('.dropdown.min-featured-level-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  $('.min-featured-level-three-button').on('click', function(){
    minFeaturedLevel = '3';
    $('#min-featured-level .selection').html('Level 3');
    $('.dropdown.min-featured-level-dropdown .button').not(this).removeClass('active');
    updateEmbedCode();
    updateSecureEmbedCode();
    updateIframeSrc();
    updateSecureIframeSrc();
    updateBrowserURL();
  });

  // apply custom styling
  $('#custom-css-preview').on('click', function() {
    plainTextCss = $('#custom-css').val();
    customCss = encodeURIComponent(plainTextCss);
    updateIframeSrc();
    updateSecureIframeSrc();
  });

});

// Populate widgets
$(function() {
  updateIframeSrc();
  updateSecureIframeSrc();
  updateEmbedCode();
  updateSecureEmbedCode();
});
