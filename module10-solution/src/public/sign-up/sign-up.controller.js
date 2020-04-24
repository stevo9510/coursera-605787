(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', 'MyInfoService'];
  function SignUpController(MenuService, MyInfoService) {
    var $ctrl = this;
    $ctrl.user = {};

    $ctrl.submit = function () {
      var promise = MenuService.getMenuItemPromise($ctrl.user.menunumber);

      promise.then(function (response) {
        console.log("Menu Item Response: ", response.data);
        MyInfoService.setMenuNumberPreference($ctrl.user.menunumber);
        $ctrl.menuNumberNotFound = false;
        $ctrl.successfullySaved = true;
      })
      .catch(function (error) {
        $ctrl.menuNumberNotFound = true;
        $ctrl.successfullySaved = false;
      });
    };
  }

})();