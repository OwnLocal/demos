var type = getUrlParameter('type') || 'standard',
    publisher = getUrlParameter('publisher') || 'atlas.secure.ownlocal.com',
    partner = getUrlParameter('partner') || '61d6777a-9740-44b9-b849-c03490182dbf',
    width = getUrlParameter('width') || '300',
    height = getUrlParameter('height') || '250',
    listings = getUrlParameter('listings') || 'false';
    maxListings = getUrlParameter('max-listings') || 6;
    filterCategory = getUrlParameter('filter-category') || '';
    filterSubcategory = getUrlParameter('filter-subcategory') || '';
    minFeaturedLevel = getUrlParameter('min-featured-level') || 0;
    daysAgo = getUrlParameter('days-ago') || 30;
    showLogo = getUrlParameter('logo') || 'true';

function updateBrowserURL() {
  var publisherOrPartner = (type === 'secure') ? '?partner=' + partner : '?publisher=' + publisher;
  window.history.replaceState(
    null,
    null,
    publisherOrPartner +
    '&listings=' + listings +
    '&width=' + width+
    '&height=' + height +
    "&maxListings=" + maxListings +
    "&category=" + filterCategory +
    "&subcategory=" + filterSubcategory +
    "&minFeaturedLevel=" + minFeaturedLevel +
    "&daysAgo=" + daysAgo +
    "&showLogo=" + showLogo 
  );
};

function updateEmbedCode() {
  $('.code').html('&lt;var id="ownlocal" data-listings="' + listings +'" data-max-listings="' + maxListings + '" data-category="' + filterCategory + '" data-subcategory="' + filterSubcategory + '" data-min-featured-level="' + minFeaturedLevel + '" data-days-ago="' + daysAgo + '" data-show-logo="' + showLogo + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script id="ownlocal-script" src="http://' + publisher + '/embed.js?h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateSecureEmbedCode() {
  $('.code.secure').html('&lt;var id="ownlocal" data-listings="' + listings +'" data-max-listings="' + maxListings + '" data-category="' + filterCategory + '" data-subcategory="' + filterSubcategory + '" data-min-featured-level="' + minFeaturedLevel + '" data-days-ago="' + daysAgo + '" data-show-logo="' + showLogo + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script async id="ownlocal-script" src="https://widget.secure.ownlocal.com/embed.js?uuid=' + partner  + '&h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateWidget() {
  $('#widget-holder').html('');
  setTimeout(function(){
    $('#widget-holder').html('<var id="ownlocal" data-listings="' + listings + '" data-max-listings="' + maxListings + '" data-category="' + filterCategory + '" data-subcategory="' + filterSubcategory + '" data-min-featured-level="' + minFeaturedLevel + '" data-days-ago="' + daysAgo + '" data-show-logo="' + showLogo + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"><script id="ownlocal-script" src="http://' + publisher + '/embed.js?h=' + height + '"></script></var>');
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
  $('#max-number-listings').val(maxListings)
  $('#min-featured-level').val(minFeaturedLevel)
  $('#days-ago').val(daysAgo)

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

  $('.categories-real-state-button, .categories-food-button').on('click', function(){
    filterCategory = this.dataset.selection;
    $('#filter-category .selection').html(titlecase(filterCategory));
    $('.dropdown.filter-category-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  $('.subcategories-real-state-button, .subcategories-food-button').on('click', function(){
    filterSubcategory = this.dataset.selection;
    $('#filter-subcategory .selection').html(titlecase(filterSubcategory));
    $('.dropdown.filter-subcategory-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  $('input#max-number-listings').on('keydown', function(e){
    if(e.keyCode == 13){
      maxListings = $(this).val();
      updateAllSrcAndUrls();
    }
  });

  $('input#min-featured-level').on('keydown', function(e){
    if(e.keyCode == 13){
      minFeaturedLevel = $(this).val();
      updateAllSrcAndUrls();
    }
  });

  $('input#days-ago').on('keydown', function(e){
    if(e.keyCode == 13){
      daysAgo = $(this).val();
      updateAllSrcAndUrls();
    }
  });

  $('.logo-true-button, .logo-false-button').on('click', function(){
    showLogo = this.dataset.selection;
    $('#show-logo .selection').html(titlecase(showLogo));
    $('.dropdown.show-logo-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

});

// Populate widgets
$(function() {
  updateEmbedCode();
  updateSecureEmbedCode();
});
