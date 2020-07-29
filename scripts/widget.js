var type = getUrlParameter('type') || 'standard',
    publisher = getUrlParameter('publisher') || 'businessdirectory.triblive.com',
    partner = getUrlParameter('partner') || '8a63c00e-a9d0-48f4-a570-8263c4e1cca3',
    width = getUrlParameter('width') || '300',
    height = getUrlParameter('height') || '250',
    minFeaturedLevel = getUrlParameter('min-featured-level') || '0',
    category = getUrlParameter('category') || 'all',
    subcategory = getUrlParameter('subcategory') || 'all',
    customCss = '',
    adcentric = getUrlParameter('adcentric') || 'false',
    defaultView = (adcentric === 'true') ? 'ads' : 'businesses',
    featuredLevelDisplay = (minFeaturedLevel == '0') ? 'None' : 'Level ' + minFeaturedLevel,
    adStartDate = getUrlParameter('days_ago') || '30';

function updateBrowserURL() {
  var publisherOrPartner = (type === 'secure') ? '?partner=' + partner : '?publisher=' + publisher;
  window.history.replaceState(null, null, publisherOrPartner + '&width=' + width + '&height=' + height);
};

function updateIframeSrc() {
  $('.ownlocal-widget.standard iframe').attr('src', 'https://' + publisher + '/embed');
};

function updateSecureIframeSrc() {
  $('.ownlocal-widget.secure iframe').attr('src', 'https://widget.secure.ownlocal.com/embed/' + partner);
};

function updateEmbedCode() {
  $('.code').html('&lt;var id="ownlocal" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script id="ownlocal-script" src="https://' + publisher + '/embed.js?h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateSecureEmbedCode() {
  $('.code.secure').html('&lt;var id="ownlocal" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script async id="ownlocal-script" src="https://widget.secure.ownlocal.com/embed.js?uuid=' + partner  + '&h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateAllSrcAndUrls() {
  updateBrowserURL();
  updateEmbedCode();
  updateIframeSrc();
  updateSecureEmbedCode();
  updateSecureIframeSrc();
}

function updateDisplayedUrls() {
  updateBrowserURL();
  updateEmbedCode();
  updateSecureEmbedCode();
}

function titlecase(word) {
  return word[0].toUpperCase() + word.slice(1);
}

$(document).ready(function() {

  if (window.location.href.indexOf("?") < 0) {
    updateBrowserURL();
  }
  
  updateIframeSrc();
  updateSecureIframeSrc();

  $('#platform-url').val(publisher);
  $('#partner-uuid').val(partner);
  $('#custom-width').val(width);
  $('#custom-height').val(height);
  $('.ownlocal-widget').css("width", width).css("height", height);
  $('#ownlocal').css("width", "auto");

  // set widget type display
  $('#widget-type .selection').html(titlecase(type));
  $('.' + type + '-widget-button').addClass('active');
  $('body').removeClass('standard-widget secure-widget').addClass(type + '-widget');

  // set dimensions display
  $('#widget-size .selection').html('Popular sizes');

  // set businesses/ads display
  $('#default-view .selection').html(titlecase(defaultView));
  $('.default-' + defaultView + '-button').addClass('active');

  // set minimum featured level display
  $('#min-featured-level .selection').html(featuredLevelDisplay);
  $('.min-featured-level-' + minFeaturedLevel + '-button').addClass('active');

  // set minimum featured level display
  $('#min-featured-level .selection').html(featuredLevelDisplay);
  $('.min-featured-level-' + minFeaturedLevel + '-button').addClass('active');

  // set ad start date display
  $('#ad-start-date .selection').html("All active ads");
  $(adStartDate + '-days-ago-button').addClass('active');

  $('.dropdown').on('click', function(){
    $(this).toggleClass('active');
    $('.dropdown').not(this).removeClass('active');
  });
  $('.outer-wrapper, input').on('click', function(){
    $('.dropdown').removeClass('active');
  });

  $('.dropdown.widget-size-dropdown .button').on('click', function(){
    width = this.dataset.width;
    height = this.dataset.height;
    $('.ownlocal-widget').css("width", width).css("height", height);
    $('#ownlocal').css("width", width);
    $(this).addClass('active');
    $('.dropdown.widget-size-dropdown .button').not(this).removeClass('active');
    $('input#custom-width').val(width);
    $('input#custom-height').val(height);
    updateDisplayedUrls();
  });

  $('input#platform-url').on('keydown', function(e){
    if(e.keyCode == 13){
      publisher = $(this).val();
      updateAllSrcAndUrls();
    }
  });

  $('input#partner-uuid').on('keydown', function(e){
    if(e.keyCode == 13){
      partner = $(this).val();
      updateAllSrcAndUrls();
    }
  });

  $('input#custom-width').on('keyup keydown click blur change', function(){
    width = $(this).val();
    $('.ownlocal-widget').css("width", width);
    $('#ownlocal').css("width", "auto");
    $('#widget-size .selection').html('Popular Sizes');
    $('.dropdown.widget-size-dropdown .button').removeClass('active');
    updateDisplayedUrls();
  });

  $('input#custom-height').on('keyup keydown click blur change', function(){
    height = $(this).val();
    $('.ownlocal-widget').css("height", height);
    $('#widget-size .selection').html('Popular Sizes');
    $('.dropdown.widget-size-dropdown .button').removeClass('active');
    updateDisplayedUrls();
  });

  $('input#category').on('keydown', function(e){
    if(e.keyCode == 13){
      category = $(this).val() || 'all';
      updateAllSrcAndUrls();
    }
  });

  $('input#subcategory').on('keydown', function(e){
    if(e.keyCode == 13){
      subcategory = $(this).val() || 'all';
      updateAllSrcAndUrls();
    }
  });

  $('.dropdown .button').on('click', function(){
    selection = this.dataset.selection;
    $(this).addClass('active');
    updateDisplayedUrls();
  });

  $('.standard-widget-button, .secure-widget-button').on('click', function(){
    type = this.dataset.selection;
    $('body').removeClass('standard-widget secure-widget').addClass(type + '-widget');
    $('#widget-type .selection').html(titlecase(type));
    $('.dropdown.widget-type-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  $('.default-ads-button, .default-businesses-button').on('click', function(){
    defaultView = this.dataset.selection;
    adcentric = this.dataset.adcentric;
    $('#default-view .selection').html(titlecase(defaultView));
    $('.dropdown.default-view-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  $('.ad-start-date').on('click', function() {
    adStartDate = this.dataset.selection;
    $('#ad-start-date .selection').html(this.dataset.display);
    $('.dropdown.ad-start-date-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  })

  $('.min-featured-level').on('click', function() {
    minFeaturedLevel = this.dataset.featured;
    featuredLevelDisplay = (minFeaturedLevel == '0') ? 'None' : 'Level ' + minFeaturedLevel;
    $('#min-featured-level .selection').html(featuredLevelDisplay);
    $('.dropdown.min-featured-level-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  })

  // apply custom styling
  $('#custom-css-preview').on('click', function() {
    var plainTextCss = $('#custom-css').val();
    customCss = encodeURIComponent(plainTextCss);
    updateIframeSrc();
    updateSecureIframeSrc();
  });

  // toggle advanced options
  $('#toggle-advanced-options').on('click', function() {
    $('#advanced-options').toggle();
  })
});

// Populate widgets
$(function() {
  updateIframeSrc();
  updateSecureIframeSrc();
  updateEmbedCode();
  updateSecureEmbedCode();
});
