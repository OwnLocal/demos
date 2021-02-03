var type = getUrlParameter('type') || 'standard',
    publisher = getUrlParameter('publisher') || 'local.waterloochronicle.ca',
    partner = getUrlParameter('partner') || '61d6777a-9740-44b9-b849-c03490182dbf',
    width = getUrlParameter('width') || '300',
    height = getUrlParameter('height') || '250',
    listings = getUrlParameter('listings') || 'false';

function updateBrowserURL() {
  var publisherOrPartner = (type === 'secure') ? '?partner=' + partner : '?publisher=' + publisher;
  window.history.replaceState(null, null, publisherOrPartner + '&listings=' + listings + '&width=' + width + '&height=' + height);
};

function updateEmbedCode() {
  $('.code').html('&lt;var id="ownlocal" data-listings="' + listings +'" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script id="ownlocal-script" src="https://' + publisher + '/embed.js?h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateSecureEmbedCode() {
  $('.code.secure').html('&lt;var id="ownlocal" data-listings="' + listings +'" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script async id="ownlocal-script" src="https://widget.secure.ownlocal.com/embed.js?uuid=' + partner  + '&h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateWidget() {
  $('#widget-holder').html('');
  setTimeout(function(){
    $('#widget-holder').html('<var id="ownlocal" data-listings="' + listings + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"><script id="ownlocal-script" src="https://' + publisher + '/embed.js?h=' + height + '"></script></var>');
  }, 1000);
}

function updateAllSrcAndUrls() {
  updateBrowserURL();
  updateEmbedCode();
  updateSecureEmbedCode();
  updateWidget();
}

function titlecase(word) {
  return word[0].toUpperCase() + word.slice(1);
}

$(document).ready(function() {

  if (window.location.href.indexOf("?") < 0) {
    updateBrowserURL();
  }
  
  updateWidget();
    
  $('#platform-url').val(publisher);
  $('#partner-uuid').val(partner);
  $('#custom-width').val(width);
  $('#custom-height').val(height);
  $('#show-listings').val(listings);

  // set widget type display
  $('#widget-type .selection').html(titlecase(type));
  $('.' + type + '-widget-button').addClass('active');
  $('body').removeClass('standard-widget secure-widget').addClass(type + '-widget');

  // Listings
  $('#show-listings .selection').html(titlecase(listings));

  $('.dropdown').on('click', function(){
    $(this).toggleClass('active');
    $('.dropdown').not(this).removeClass('active');
  });
  $('.outer-wrapper, input').on('click', function(){
    $('.dropdown').removeClass('active');
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

  $('input#custom-width').on('change', function(){
    width = $(this).val();
    updateAllSrcAndUrls();
  });

  $('input#custom-height').on('change', function(){
    height = $(this).val();
    updateAllSrcAndUrls();
  });

  $('.dropdown .button').on('click', function(){
    selection = this.dataset.selection;
    $(this).addClass('active');
  });

  $('.standard-widget-button, .secure-widget-button').on('click', function(){
    type = this.dataset.selection;
    $('body').removeClass('standard-widget secure-widget').addClass(type + '-widget');
    $('#widget-type .selection').html(titlecase(type));
    $('.dropdown.widget-type-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  $('.listings-true-button, .listings-false-button').on('click', function(){
    listings = this.dataset.selection;
    $('#show-listings .selection').html(titlecase(listings));
    $('.dropdown.show-listings-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

});

// Populate widgets
$(function() {
  updateEmbedCode();
  updateSecureEmbedCode();
});
