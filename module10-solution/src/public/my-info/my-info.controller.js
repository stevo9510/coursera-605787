(function () {
    "use strict";

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['MenuService', 'MyInfoService'];
    function MyInfoController(MenuService, MyInfoService) {
        var $ctrl = this;
        $ctrl.favoriteMenuItem = null;

        $ctrl.userInfo = MyInfoService.getUserInfo();
        console.log("User Info:", $ctrl.userInfo);
        if ($ctrl.userInfo && $ctrl.userInfo.menunumber) {
            console.log("Loaded Preference: ", $ctrl.userInfo.menunumber);
            MenuService.getMenuItemPromise($ctrl.userInfo.menunumber)
                .then(function (response) {
                    console.log("Response Data: ", response.data);
                    $ctrl.favoriteMenuItem = response.data;
                });
        }
    }

})();