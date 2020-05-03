describe('menuservice', function () {

    var menuservice;
    var $httpBackend;
    var ApiBasePath;

    beforeEach(function () {
        module('public');

        inject(function ($injector) {
            menuservice = $injector.get('MenuService');
            $httpBackend = $injector.get('$httpBackend');
            ApiPath = $injector.get('ApiPath');
        });
    });

    it('Should return the correct data when successful', function () {
        var menuItemShortName = "A1";
        $httpBackend.expectGET(ApiPath + '/menu_items/' + menuItemShortName + '.json').respond(['Lunch', 'Dessert']);
        menuservice.getMenuItemDetails(menuItemShortName).then(function (details) {
            expect(details).toEqual(['Lunch', 'Dessert']);
        });
        $httpBackend.flush();
    });

    it('Should return null when error', function () {
        var menuItemShortName = "C33";
        // force a bad response (404 error in this case).
        $httpBackend.expectGET(ApiPath + '/menu_items/' + menuItemShortName + '.json').respond(404, 'Bad request');
        menuservice.getMenuItemDetails(menuItemShortName).then(function (details) {
            expect(details).toEqual(null);
        });
        $httpBackend.flush();
    });

});
