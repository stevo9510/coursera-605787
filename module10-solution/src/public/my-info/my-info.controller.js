(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService', 'MyInfoService'];
    function MyInfoController(MenuService, MyInfoService) {
        var $ctrl = this;
        $ctrl.favoriteMenuItem = null;

        $ctrl.userInfo = MyInfoService.getUserInfo();
        if ($ctrl.userInfo && $ctrl.userInfo.menunumber) {
            MenuService.getMenuItemDetails($ctrl.userInfo.menunumber)
                .then(function (details) {
                    $ctrl.favoriteMenuItem = details;
                });
        }
    }

})();