(function () {
    "use strict";

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'MenuService', 'MyInfoService'];
    function SignUpController($scope, MenuService, MyInfoService) {
        var $ctrl = this;
        $ctrl.user = {};

        $ctrl.menuItemOnBlur = function () {
            var promise = MenuService.getMenuItemPromise($ctrl.user.menunumber);

            promise.then(function (response) {
                console.log("Menu Item Response: ", response.data);
                $scope.regForm.menunumber.$setValidity("invalid", true);
            })
                .catch(function (error) {
                    $scope.regForm.menunumber.$setValidity("invalid", false);
                });
        }

        $ctrl.submit = function () {
            MyInfoService.setUserInfo($ctrl.user);
            $ctrl.successfullySaved = true;
        };
    };

}) ();