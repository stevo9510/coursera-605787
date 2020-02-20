(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .filter('angularMoney', AngularMoneyFilter)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){
        var tbList = this;

        tbList.items = ShoppingListCheckOffService.getToBuyItems();

        tbList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };

        tbList.isNaturalNumber = function(val) {
            /* Note: Didn't use Number.isInteger as that's not supported in IE11 */
            return !isNaN(val) 
                && val != '' // NaN will return true for empty strings
                && Math.floor(val) == val  // ensure it's a whole number.
                && val >= 0;  // and non-negative
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var abList = this;
        abList.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService(){
        var service = this;

        // List of shopping items
        var toBuyItems = [
            { name: "cookies", pricePerItem : 0.75, quantity: 10 }, 
            { name: "pie", pricePerItem: 5.25, quantity: 3 },
            { name: "pizza", pricePerItem: 10.99, quantity: 2 },
            { name: "tacos", pricePerItem: 2, quantity: 20 },
            { name: "gyro", pricePerItem: 6.5, quantity: 11 },
            { name: "reeses", pricePerItem: 1.0, quantity: 5 }
        ];
        var boughtItems = [];
  
        service.buyItem = function(itemIndex){
            var boughtItem = toBuyItems.splice(itemIndex, 1);
            boughtItems.push(boughtItem[0]);
        };
  
        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    }

    // Custom Filter.  Note that a lot of this could be handled using built in
    // currency filter, however, decided to implement it all here to make it more interesting.
    // See note in HTML of a way to handle it with Currency filter.
    function AngularMoneyFilter() {
        return function (input) {
            input = input || 0;
            input = "$$$" + input.toFixed(2);
            return input;     
        }
    }

})();
