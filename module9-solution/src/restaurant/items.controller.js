(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['MenuDataService', 'items', 'category'];
    function ItemsController(MenuDataService, items, category) {
        var itemsCtrl = this;
        itemsCtrl.items = items.data;
        itemsCtrl.category = category;
        console.log("Food Items", itemsCtrl.items);
    }

})();
