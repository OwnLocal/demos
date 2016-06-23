angular.module('fancybox', [])
  .directive('fancyboxModal', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var opts = JSON.parse(attrs.fancyboxModal);
        $(element).fancybox(opts);
      }
    }
  });
