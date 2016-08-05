angular.module('olUtilities', [])
  .factory('oluRequireAttrs', [
    function() {
      return function(attrs, directiveName, requiredAttrs) {
        requiredAttrs.forEach(function(requiredAttr) {
          if (!attrs[requiredAttr]) throw new Error(directiveName + ' directive requires attribute ' + requiredAttr);
        });
      };
    }
  ])
;

angular.module('olWidgets', ['olUtilities'])
  .directive('olSortableTable', [
    function() {
      return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
          var bizTable = $($element),  // Handy DOM elements
              bizThead = bizTable.find('thead'),
              bizTbody = bizTable.find('tbody'),

              currentSortIndex = null                 // Tracks index of sort column.
          ;

          bizThead.on('click.sort', 'th[data-is-sortable]', sortByColumn);
          bizTable.find('[data-is-initially-sorted]').trigger('click');

          // Attach a click handler to table headers that have a data-is-sortable attribute
          function sortByColumn() {
            var sortHeader = $(this),
                sortIndex = sortHeader.index(),         // Which column's header was clicked?
                tableRows = bizTbody.find('tr').get()   // .get() converts to a real array of native DOM elements
            ;

            // Update sort decoration in the header.
            bizThead.find('.currently-sorted').removeClass('currently-sorted');
            sortHeader.addClass('currently-sorted');

            // If we're currently sorted on this field, just reverse the row order.
            // If not, note that we're about to be, and do more work...
            if (sortIndex === currentSortIndex) {
              tableRows = tableRows.reverse().map(function(nativeRow) { return $(nativeRow); });
            } else {
              currentSortIndex = sortIndex;

              // Remove body sort decoration; we'll add it in the right place as we iterate through the table rows.
              bizTbody.find('.currently-sorted').removeClass('currently-sorted');
              tableRows = tableRows
                  .map(function(domRow) {
                    var jqRow = $(domRow),
                        sortValue = $(jqRow.children().get(sortIndex))  // Find the cell in the same column as the sort header,
                            .addClass('currently-sorted')               // adding sort decoration once we find it.
                            .text()                                     // Use the cell's text content as the value...
                        ;
                    return [sortValue, jqRow];                          // ...convert to value+row tuples...
                  })
                  .sort()                                                 // ...so we can sort them...
                  .map(function(valueAndRow) { return valueAndRow[1]; })  // ...then pluck the rows back out.
              ;
            }

            // appendTo() moves each row in its sorted turn to the end of the table.
            tableRows.forEach(function(thisRow) { thisRow.appendTo(bizTbody); });
          }
        }
      };
    }
  ])
  .directive('olWidgetsMap', [ 'oluRequireAttrs',
    function(oluRequireAttrs) {
      return {
        restrict: 'A',
        controller: [ '$scope', '$element', '$attrs',
          function($scope, $element, $attrs) {
            oluRequireAttrs($attrs, 'ol-widgets-map', ['id', 'latitude', 'longitude', 'zoom', 'tileLayer']);
            $scope.distanceAway = distanceAway;
            var zoomToMarkers = !$attrs.noZoomToMarkers;

            // Create the initial map and make it available on the controller for our ol-widgets-map-marker children.
            var map = L.map($attrs.id, { scrollWheelZoom: false, zoomControl: true }).setView([$attrs.latitude, $attrs.longitude], parseInt($attrs.zoom));
            L.tileLayer($attrs.tileLayer).addTo(map);

            var resizeTimeout;

            var markerArray = [];
            this.addMarker = function(marker) {
              marker.addTo(map);
              markerArray.push(marker);
              if (zoomToMarkers) {
                if (resizeTimeout) { clearTimeout(resizeTimeout); resizeTimeout = null; }
                resizeTimeout = setTimeout(resizeMap, 100);
              }
            };

            function resizeMap(){
              var group = new L.featureGroup(markerArray);
              map.fitBounds(group.getBounds());
            }

            function distanceAway(publisher_lat, publisher_lon, business){
              if (business.location == undefined) {
                return false;
              } else {
                  var dLat = deg2rad(business.location.lat - publisher_lat);
                  var dLon = deg2rad(business.location.lon - publisher_lon);
                  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(publisher_lat)) * Math.cos(deg2rad(business.location.lat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
                  var distance = (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))) * 3958.754;
                if (distance <= 50) {
                  return true;
                }
              }
            };
            function deg2rad(deg) {
              return deg * (Math.PI/180)
            };
          }
        ]
      };
    }
  ])
  .directive('olWidgetsMapMarker', [ '$interpolate', 'oluRequireAttrs',
    function($interpolate, oluRequireAttrs) {
      return {
        require: '^olWidgetsMap',
        restrict: 'E',
        replace: true,
        template: '<span style="display:none;" ng-transclude></span>',
        transclude: true,
        link: function($scope, $element, $attrs, olWidgetsMap) {
          oluRequireAttrs($attrs, 'ol-widgets-map-marker', ['latitude', 'longitude']);

          var leafletMarker = L.marker([$attrs.latitude, $attrs.longitude], {
            icon: new L.Icon({
              iconUrl: '/assets/marker-icon-2x.png',
              retinaUrl: '/assets/marker-icon-2x.png',
              shadowUrl: '/assets/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          });
          leafletMarker.bindPopup( $interpolate($element.html())($scope) );
          olWidgetsMap.addMarker(leafletMarker);
        }
      }
    }
  ])

;

angular.module('localFusionApi', [])

  .factory('lfBusinessApi', [ '$http', '$window',
    function($http, $window) {

      // This is the singleton object clients get when they dependency-inject flBusinessApi
      return {
        search: search
      };

      /** Create a search object.
       *
       * @param q [String] is the string to search for.
       * @param options [Object] is an options object; see inline docs for available options.
       * @returns {{q: *, options: void, isLoading: boolean, businesses: Array, getPage: getPage}}
       */
      function search(q, options) {
        var pageNumber = 0,
          search = {

            // Configuration properties that were provided or defaulted.
            q: q,
            options: $.extend({
              pageSize: 12    // how many results per page?
            }, options || {}),

            // State properties we maintain that can be used by clients.
            isLoading: false,   // boolean indicating whether we're in the midst of data retrieval
            hasError: false,    // boolean indicating whether our last request resulted in an error.
            isComplete: false,  // boolean indicating whether we've loaded the last page of results
            businesses: [],     // array of the business objects we've retrieved so far.

            // Methods clients can call.
            getPage: getPage,
            onPage: function(callback) { onPageCallbacks.push(callback); return search; }
          },
          onPageCallbacks = []
          ;
        return search;

        /**
         *
         */
        function getPage() {
          if (search.isLoading) { throw new Error('already loading a page'); }
          if (search.isComplete) { throw new Error('already reached last page'); }
          pageNumber++;

          search.isLoading = true;
          search.hasError = false;

          return $http
            .get($window.location.pathname + '.json', {
              params: {
                q: search.q,
                offset: options.pageSize * (pageNumber - 1),
                limit: options.pageSize
              }
            })
            .then(handleSuccess, handleError)
            ;

          function handleSuccess(response) {
            handleComplete();
            search.businesses = search.businesses.concat(response.data);
            search.isComplete = !response.data.length; // 0 becomes true, >0 becomes false
            onPageCallbacks.forEach(function(callback) {
              callback(response.data);
            });
          }
          function handleError(response) {
            handleComplete();
            pageNumber--; // so we try for the same page on the next getPage() call.
            console.log('Error searching businesses', response);
            search.hasError = true;
          }
          function handleComplete() {
            search.isLoading = false;
          }
        }
      }
    }
  ])
;

angular.module('localFusionApp', ['localFusionApi', 'olWidgets', 'fancybox'])

  .constant('smartCategories', [
    { slug: "restaurants",     icon: "local_dining",   name: "Food"        },
    { slug: "shopping",        icon: "local_mall",     name: "Shopping"    },
    { slug: "utilities",       icon: "build",          name: "Utilities"   },
    { slug: "lawn-and-garden", icon: "nature",         name: "Lawn"        },
    { slug: "auto",            icon: "directions_car", name: "Auto"        },
    { slug: "medical",         icon: "local_hospital", name: "Medical"     },
    { slug: "clothing",        icon: "local_mall",     name: "Clothing"    },
    { slug: "nightlife",       icon: "local_bar",      name: "Nightlife"   },
    { slug: "real-estate",     icon: "home",           name: "Real Estate" }
  ])

  .config([ '$interpolateProvider',
    function($interpolateProvider) {
      // Unfortunately, Angular's use of {{expr}} conflicts with LiquidMarkup, so we are using {[{expr}]} instead.
      $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
    }
  ])

  /**
   * Simple directive that makes the smartCategories constant (see above) available on the $scope.
   */
  .directive('usesSmartCategories', [ 'smartCategories',
    function(smartCategories) {
      return {
        restrict: 'A',
        link: function($scope) {
          $scope.smartCategories = smartCategories;
        }
      };
    }
  ])

  /**
   * Put lf-cloak on elements that are showing funny curly braces (Angular markup) before Angular finishes loading.
   */
  .directive('lfCloak', [
    function() {
      return {
        restrict: 'A',
        link: function($scope, $element) {
          $element.css('visibility', 'visible'); // Undoes the [lf-cloak] style declared in global.css.scss
        }
      };
    }
  ])

  /**
   * Put lf-strip-whitespace on elements that should have HTML-induced leading whitespace removed, e.g. publisher-provided HTML.
   */
  .directive('lfStripWhitespace', [
    function() {
      return {
        restrict: 'A',
        link: function($scope, $element) {
          $($element).children().toArray().some(function(childElement) {
            childElement = $(childElement);
            var hasText = !!(childElement.text().trim());
            if (!hasText) childElement.remove();
            return hasText;
          });
        }
      };
    }
  ])

  .controller('BusinessSearchController', [ '$scope', '$element', '$attrs', 'lfBusinessApi',
    /*  Usage: <div ng-controller="BusinessSearchController" business-search-q="restaurants" business-search-options="{pageSize:12}"></div>

     The div's $scope gains a businessSearch property, which is an object as returned by lfBusinessApi.search().
     Useful for <div ng-repeat="business in businessSearch.businesses"></div>

     */
    function($scope, $element, $attrs, lfBusinessApi) {

      $scope.$watchCollection(
        function() { return [$attrs.businessSearchQ, $attrs.businessSearchOptions]; },
        setupSearch
      );

      function setupSearch(qAndOptions) {
        var q = qAndOptions[0],
            options = $scope.$eval(qAndOptions[1])
        ;
        $scope.businessSearch = lfBusinessApi.search(q, options);

        $scope.businessSearch.getPage();
      }
    }
  ])

;
