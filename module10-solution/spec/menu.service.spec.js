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

    it('should return categories list', function () {
        var category = "A1";
        $httpBackend.whenGET(ApiPath + '/menu_items/' + category + '.json').respond(['Lunch', 'Dessert']);
        menuservice.getMenuItemPromise(category).then(function (response) {
            expect(response.data).toEqual(['Lunch', 'Dessert']);
        });
        $httpBackend.flush();
    });

});
