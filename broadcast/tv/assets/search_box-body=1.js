$(function() {

  makeSearchBox('searchBox', [
    'Restaurants',
    'Beauty salons',
    'General contractors',
    'Legal services'
  ]);
  makeSearchBox('searchBoxEs', [
    'Restaurantes',
    'Salones de belleza',
    'Contratistas',
    'Servicios legales'
  ]);

  function makeSearchBox(searchBoxId, keywords) {

    var searchBox = $('#' + searchBoxId);

    if (searchBox.length) {

      var index = 0;
      var arrCounter = 0;
      var timer1, timer2;

      function resetBox() {
        searchBox.val('');
        index = 0;
        autoType();
      }

      var autoType = function() {
        if (index <= keywords[arrCounter].length) {
          searchBox.val(keywords[arrCounter].substr(0, index++));
          timer1 = setTimeout(autoType, 40);
        } else {
          arrCounter++;
          if(arrCounter === keywords.length){
            arrCounter = 0;
          }

          timer2 = setTimeout(resetBox, 3500);
        }
      };

      autoType();
      searchBox.focusin(function() {
        this.value = '';
        clearTimeout(timer1);
        clearTimeout(timer2);
      }).focusout(function() {
        setTimeout(function() {
          resetBox();
        }, 1000);
      });
    }
  }
});
