beforeEach(function () {
    module('myApp')
});

describe("startDateCheckSpec", function () {

    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope;
        var element = angular.element(
            '<form name="form">' +
                '<input type="text" name="startDate" data-ng-model="leavingFrom" data-my-start-date-check>' +
            '</form > '
        );
        $scope.model = { startDate: null };
        $compile(element)($scope);
        $scope.$digest();
        form = $scope.form;
    }));

    it('should be valid initially', function () {
        expect(form.startDate.$valid).toBe(true);
    });

    it('should be invalid when user enters an airport that starts with a different letter than a or A', function () {
        form.leaving_from.$setViewValue('SLC');
        expect(form.leaving_from.$valid).toBe(false);
    });
});