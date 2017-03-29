
beforeEach(function () { module('date.directives') });

var startElement = angular.element(
        '<form name="myForm"><input type="text" ng-model="fromDate" name="fromDate" date-check to-date="toDate" /></form>'
    ),
    $scope,
    today = new Date();

var daysAgo = new Date();
daysAgo.setDate(daysAgo.getDate() - 5);

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

describe('When from date is today and to date is 5 days before today', function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.fromDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getUTCFullYear();
        $scope.toDate = (daysAgo.getMonth() + 1) + "/" + daysAgo.getDate() + "/" + daysAgo.getUTCFullYear();

        $compile(startElement)($scope);
        $scope.$digest();
    }));

    it('should not be valid', function () {
        expect($scope.myForm.fromDate.$error).not.toBeUndefined();
        expect($scope.myForm.fromDate.$error.dateError).toBe(true);
    });
});

describe("When from date is today and to date is tomorrow", function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.fromDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getUTCFullYear();
        $scope.toDate = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getUTCFullYear();

        var result = $compile(startElement)($scope);
        $scope.$digest();
    }));

    it('should be invalid', function () {
        expect($scope.myForm.fromDate.$error.dateError).toBeUndefined();
    });
});

var endElement = angular.element(
            '<form name="myForm">' +
                '<input type="text" name="toDate" ng-model="toDate" date-check from-date="fromDate" />' +
            '</form > '
        );

describe('"When the to date is set to tomorrow and from date is today', function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.toDate = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getUTCFullYear();
        $scope.fromDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getUTCFullYear();

        $compile(endElement)($scope);
        $scope.$digest();
    }));

    it('should be valid', function () {
        expect($scope.myForm.toDate.$error.dateError).toBeUndefined();
    });
});

describe("When the to date is set to today and from date is tomorrow", function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.toDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getUTCFullYear();
        $scope.fromDate = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getUTCFullYear();

        $compile(endElement)($scope);
        form = $scope.form;
        $scope.$digest();
    }));

    it('should not be valid', function () {
        expect($scope.myForm.toDate.$error).not.toBeUndefined();
        expect($scope.myForm.toDate.$error.dateError).toBe(true);
    });
});