(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService){

        var tbList = this;

        tbList.items = ShoppingListCheckOffService.getToBuyItems();

        tbList.buyItem = function(itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
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

})();
