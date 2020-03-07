(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('menuItemsEndpoint', "https://davids-restaurant.herokuapp.com/menu_items.json")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                onRemove: '&',
                title: '@'
            }
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var nCtrl = this;

        nCtrl.searchTerm = "";
        nCtrl.found = [];
        nCtrl.title = ""; 

        nCtrl.narrowItDown = function () {
            // handle case when no search term is entered, do not return any results.
            // does not even try to search, for performance
            if(nCtrl.searchTerm === "") {
                nCtrl.found = [];
                nCtrl.title = "Nothing Found";
            }
            else {
                var matchedItems = MenuSearchService.getMatchedMenuItems(nCtrl.searchTerm);
                matchedItems.then(function (foundItems) {
                    nCtrl.found = foundItems;
                    nCtrl.title = nCtrl.found.length > 0 ? "Found Items" : "Nothing Found";
                });
            }
        };

        nCtrl.removeItem = function (itemIndex) {
            nCtrl.found.splice(itemIndex, 1);
        };
    }

    function MenuSearchService($http, menuItemsEndpoint) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            // we'll be doing a case insensitive search
            var searchTermLower = searchTerm.toLowerCase();
            var response = $http({
                method: "GET",
                url: (menuItemsEndpoint)
            }).then(function (result) {
                var menuItems = result.data.menu_items;
                var foundItems = [];

                for (var i = 0; i < menuItems.length; i++) {
                    var menuItem = menuItems[i];
                    if (menuItem.description.toLowerCase().indexOf(searchTermLower) !== -1) {
                        foundItems.push(menuItem);
                    }
                }
                return foundItems;
            });

            return response;
        };

        service.buyItem = function (itemIndex) {
            var boughtItem = toBuyItems.splice(itemIndex, 1);
            boughtItems.push(boughtItem[0]);
        };
    }
})();
