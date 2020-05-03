describe("Sign Up Controller", function () {

    beforeEach(function () {
        module(function ($provide) {

            $provide.service('MenuServiceMock', function () {
                var service = this;
                service.getMenuItemDetails = function (shortName) {
                    return null;
                };
            });

            $provide.service('MyInfoServiceMock', function () {
                var service = this;
                service.setUserInfoCalled = false;

                service.setUserInfo = function (userInfo) {
                    service.setUserInfoCalled = true;
                };
            });
        });

        module('public');
    });

    var $controller;
    var signUpController;
    var myInfoServiceMock;

    beforeEach(inject(function (_$controller_, MenuServiceMock, MyInfoServiceMock) {
        $controller = _$controller_;

        signUpController =
            $controller('SignUpController', { MenuService: MenuServiceMock, MyInfoService: MyInfoServiceMock });
        menuServiceMock = MenuServiceMock;
        myInfoServiceMock = MyInfoServiceMock;
    }));

    it("Should set user info on save", function () {
        signUpController.submit();
        expect(myInfoServiceMock.setUserInfoCalled).toBe(true);
        expect(signUpController.successfullySaved).toBe(true);
    });

    it("Should temporarily invalidate view on menu item changed", function () {
        // create a mock object for the form to set validity.
        var formMock = (function () {
            var scope = this;
            scope.errorKey = null;
            scope.isValid = null;
            scope.$setValidity = function (key, valid) {
                scope.errorKey = key;
                scope.isValid = valid;
            }

            return scope;
        })();

        signUpController.menuItemChanged(formMock);
        expect(formMock.errorKey).toBe("invalid");
        expect(formMock.isValid).toBe(false);
        expect(signUpController.menuItemNotValidated).toBe(true);
    });
});
