$(window).load(function() {
  $('body').addClass('loaded');
});
// Go to content from hero
$(document).on('click', '.nav-item a, .cta-container a', function(){
  $("html, body").animate({ scrollTop: $('.section.' + $(this).attr('data-target')).offset().top }, 500);
});

/* Instagram */
$(document).ready(function() {
  instagram = "https://www.instagram.com/" + $('#about').attr('data-instagram-username') + "/media/";
  $.getJSON( instagram, function( data ) {
    items = [];
    $.each( data, function( item, card ) {
      cardOpening = "<div class='cn-card " + card.service + "'>";
      cardClosing = "</div><div class='cn-date'>" + formattedCardDate + "</div></div>";
      items.push( cardOpening + cardClosing);
    });
    $( "<div>", {
      "class": "cn-feed",
      html: items.join("")
    }).appendTo("#about");
  });
});