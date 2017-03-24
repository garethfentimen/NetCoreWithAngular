
beforeEach(function () { module('date.directives') });

var startElement = angular.element(
        '<form name="myForm"><input type="text" ng-model="fromDate" name="fromDate" date-check is-to-date="false" /></form>'
    ),
    $scope,
    today = new Date();

var daysAgo = new Date();
daysAgo.setDate(daysAgo.getDate() - 5);

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

describe('When the from date is set to tomorrow', function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.fromDate = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getUTCFullYear();

        $compile(startElement)($scope);
        $scope.$digest();
    }));

    it('should not be valid', function () {
        expect($scope.myForm.fromDate.$error).not.toBeUndefined();
        expect($scope.myForm.fromDate.$error.dateError).toBe(true);
    });
});

describe("When the from date is set to today", function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.fromDate = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getUTCFullYear();

        var result = $compile(startElement)($scope);
        $scope.$digest();
    }));

    it('should be valid', function () {
        expect($scope.myForm.fromDate.$error.dateError).toBeUndefined();
    });
});

describe("When the from date is set to 5 days ago", function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.fromDate = (daysAgo.getMonth() + 1) + "/" + daysAgo.getDate() + "/" + daysAgo.getUTCFullYear();

        $compile(startElement)($scope);
        $scope.$digest();
    }));

    it('should be valid', function () {
        expect($scope.myForm.fromDate.$error.dateError).toBeUndefined();
    });
});

/////  to date checks

var endElement = angular.element(
            '<form name="myForm">' +
                '<input type="text" name="toDate" ng-model="toDate" date-check is-to-date="true" />' +
            '</form > '
        );

describe('When the to date is set to tomorrow', function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.toDate = (tomorrow.getMonth() + 1) + "/" + tomorrow.getDate() + "/" + tomorrow.getUTCFullYear();

        $compile(endElement)($scope);
        $scope.$digest();
    }));

    it('should be valid', function () {
        expect($scope.myForm.toDate.$error.dateError).toBeUndefined();
    });
});

describe("When the to date is set to 5 days ago", function () {
    beforeEach(inject(function ($compile, $rootScope) {
        $scope = $rootScope.$new();
        $scope.toDate = (daysAgo.getMonth() + 1) + "/" + daysAgo.getDate() + "/" + daysAgo.getUTCFullYear();

        $compile(endElement)($scope);
        form = $scope.form;
        $scope.$digest();
    }));

    it('should not be valid', function () {
        expect($scope.myForm.toDate.$error).not.toBeUndefined();
        expect($scope.myForm.toDate.$error.dateError).toBe(true);
    });
});