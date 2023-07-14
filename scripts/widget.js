var type = getUrlParameter('type') || 'standard',
    publisher = getUrlParameter('publisher') || 'atlas.secure.ownlocal.com',
    title = getUrlParameter('title') || '';
    partner = getUrlParameter('partner') || '61d6777a-9740-44b9-b849-c03490182dbf',
    width = getUrlParameter('width') || '300',
    height = getUrlParameter('height') || '250',
    listings = getUrlParameter('listings') || 'true';
    filterCategory = getUrlParameter('categoryId') || 'all';
    filterCategoryName = getUrlParameter('categoryName') || 'all';
    minFeaturedLevel = getUrlParameter('minFeaturedLevel') || 0;
    backgroundColor = getUrlParameter('backgroundColor') || '7b94ff';
    showIcon = getUrlParameter('showIcon') || "true";
    showLogo = getUrlParameter('showLogo') || "true";
    showLocation = getUrlParameter('showLocation') || "true";
    filterFeatureLevel = getUrlParameter('filterFeatureLevel') || "false";
    showPhone = getUrlParameter('showPhone') || "false";
    filterActivity = getUrlParameter('activity') || "last_three_month";
    filterActivityName = getUrlParameter('activityName') || "Last 3 months";
    // daysAgo = getUrlParameter('days-ago') || 30;

function updateBrowserURL() {
  var publisherOrPartner = (type === 'secure') ? '?partner=' + partner : '?publisher=' + publisher;
  window.history.replaceState(
    null,
    null,
    publisherOrPartner +
    '&listings=' + listings +
    '&width=' + width+
    '&height=' + height +
    "&categoryId=" + filterCategory +
    "&categoryName=" + filterCategoryName +
    "&activity=" + filterActivity +
    "&activityName=" + filterActivityName +
    "&minFeaturedLevel=" + minFeaturedLevel +
    "&backgroundColor=" + backgroundColor +
    "&title=" + title +
    "&showLocation=" + showLocation +
    "&filterFeatureLevel=" + filterFeatureLevel +
    "&showPhone=" + showPhone +
    "&showIcon=" + showIcon +
    "&showLogo=" + showLogo
    // "&daysAgo=" + daysAgo +
  );
};

function updateEmbedCode() {
  $('.code').html('&lt;var id="ownlocal" data-listings="' + listings +'" data-title="'+ title +'" data-show-icon="'+ showIcon +'" data-background-color="'+ backgroundColor +'" data-filter-feature-level="' + filterFeatureLevel + '" data-filter-activity="' + filterActivity + '" data-category-id="' + filterCategory + '" data-show-phone="' + showPhone + '" data-show-location="' + showLocation + '" data-show-logo="' + showLogo + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script id="ownlocal-script" src="https://' + publisher + '/embed.js?h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateSecureEmbedCode() {
  $('.code.secure').html('&lt;var id="ownlocal" data-listings="' + listings +'" data-title="'+ title +'" data-show-icon="'+ showIcon +'" data-background-color="'+ backgroundColor +'" data-filter-feature-level="' + filterFeatureLevel + '" data-filter-activity="' + filterActivity + '" data-category-id="' + filterCategory + '" data-show-phone="' + showPhone + '" data-show-location="' + showLocation + '" data-show-logo="' + showLogo + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"&gt;&lt;script async id="ownlocal-script" src="https://widget.secure.ownlocal.com/embed.js?uuid=' + partner  + '&h=' + height + '"&gt;&lt;/script&gt;&lt;/var&gt;');
};

function updateWidget() {
  $('#widget-holder').html('');
  setTimeout(function(){
    $('#widget-holder').html('<var id="ownlocal" data-listings="' + listings + '" data-title="'+ title +'" data-show-icon="'+ showIcon +'" data-background-color="'+ backgroundColor +'" data-filter-feature-level="' + filterFeatureLevel + '" data-filter-activity="' + filterActivity + '" data-category-id="' + filterCategory + '" data-show-phone="' + showPhone + '" data-show-location="' + showLocation + '" data-show-logo="' + showLogo + '" style="width: ' + width + 'px; margin: 0 auto; display: block;"><script id="ownlocal-script" src="https://' + publisher + '/embed.js?h=' + height + '"></script></var>');
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
  $("#title").val(title)
  $('#partner-uuid').val(partner);
  $('#custom-width').val(width);
  $('#custom-height').val(height);
  $('#show-listings').val(listings);
  $('#min-featured-level').val(minFeaturedLevel)
  $("#background-color").val("#"+backgroundColor)
  $('#show-icon').prop("checked", showIcon == "true");
  $('#show-logo').prop("checked", showLogo == "true");
  $('#show-location').prop("checked", showLocation == "true");
  $('#show-phone').prop("checked", showPhone == "true");
  $('#filter-feature-level').prop("checked", filterFeatureLevel == "true");

  // $('#show-logo').val(showLogo);
  // $('#days-ago').val(daysAgo)

  // set widget type display
  $('#widget-type .selection').html(titlecase(type));
  $('.' + type + '-widget-button').addClass('active');
  $('body').removeClass('standard-widget secure-widget').addClass(type + '-widget');

  // Listings
  $('#show-listings .selection').html(titlecase(listings));

  // Category
  $('#filter-category .selection').html(titlecase(filterCategoryName));

  // Activity
  $('#filter-activity .selection').html(titlecase(filterActivityName));

  $('.dropdown').on('click', function(){
    $(this).toggleClass('active');
    $('.dropdown').not(this).removeClass('active');
  });
  $('.outer-wrapper, input').on('click', function(){
    $('.dropdown').removeClass('active');
  });

  $('input#title').on('keydown', function(e){
    if(e.keyCode == 13){
      title = $(this).val();
      updateAllSrcAndUrls();
    }
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

  $('input#custom-width').on('keydown', function(e){
    if(e.keyCode == 13){
      width = $(this).val();
      updateAllSrcAndUrls();
    }
  });

  $('input#custom-height').on('keydown', function(e){
    if(e.keyCode == 13){
      height = $(this).val();
      updateAllSrcAndUrls();
    }
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

  $('.category-id-button').on('click', function(){
    filterCategory = this.dataset.selection;
    filterCategoryName = this.dataset.category;

    $('#filter-category .selection').html(titlecase(filterCategoryName));
    $('.dropdown.filter-category-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  $('.activity-button').on('click', function(){
    filterActivity = this.dataset.selection;
    filterActivityName = this.dataset.activity;

    $('#filter-activity .selection').html(titlecase(filterActivityName));
    $('.dropdown.filter-activity-dropdown .button').not(this).removeClass('active');
    updateAllSrcAndUrls();
  });

  // $('input#min-featured-level').on('keydown', function(e){
  //   if(e.keyCode == 13){
  //     minFeaturedLevel = $(this).val();
  //     updateAllSrcAndUrls();
  //   }
  // });

  $('input#background-color').on('change', function(e){
    backgroundColor = $(this).val().replace("#", "");
    updateAllSrcAndUrls();
  });

  // $('input#days-ago').on('keydown', function(e){
  //   if(e.keyCode == 13){
  //     daysAgo = $(this).val();
  //     updateAllSrcAndUrls();
  //   }
  // });

  $('#show-icon').on('change', function(){
    showIcon = $("#show-icon").is(":checked");
    updateAllSrcAndUrls();
  });

  $('#show-logo').on('change', function(){
    showLogo = $("#show-logo").is(":checked");
    updateAllSrcAndUrls();
  });

  $('#show-location').on('change', function(){
    showLocation = $("#show-location").is(":checked");
    updateAllSrcAndUrls();
  });

  $('#show-phone').on('change', function(){
    showPhone = $("#show-phone").is(":checked");
    updateAllSrcAndUrls();
  });

  $('#show-feature-level').on('change', function(){
    filterFeatureLevel = $("#show-feature-level").is(":checked");
    updateAllSrcAndUrls();
  });

  $('#apply-button').on('click', function(){
    title = $("#title").val();
    backgroundColor = $("#background-color").val().replace("#", "");
    width = $("#custom-width").val();
    height = $("#custom-height").val();
    updateAllSrcAndUrls();
  });

  $('#reset-button').on('click', function(){
    title = ""
    backgroundColor = "7b94ff"
    width = "300"
    height = "250"
    filterCategory = "all"
    filterCategoryName = "all"
    showIcon = "true"
    showLogo = "true"
    showLocation = "true"
    filterFeatureLevel = "false"
    showPhone = "false"
    filterActivity = "last_three_month"
    filterActivityName = "Last 3 months"

    $("#title").val("");
    $("#background-color").val("#7b94ff");
    $("#custom-width").val("300");
    $("#custom-height").val("250");
    $('#filter-category .selection').html(titlecase(filterCategoryName));
    $('#show-icon').prop("checked", true);
    $('#show-logo').prop("checked", true);
    $('#show-location').prop("checked", true);
    $('#show-phone').prop("checked", false);
    $('#filter-feature-level').prop("checked", false);
    $('#filter-activity .selection').html(titlecase(filterActivityName));
    updateAllSrcAndUrls();
  });

});

// Populate widgets
$(function() {
  updateEmbedCode();
  updateSecureEmbedCode();
});
