(function (angular) {
    'use strict';

    function convertToDateFromString(value) {
        if (!value) {
            return null;
        }

        var splitDate = value.split("/");

        var dateValueMonth = splitDate[0] - 1,
            dateValueDay = splitDate[1],
            dateValueYear = splitDate[2];

        return new Date(dateValueYear, dateValueMonth, dateValueDay);;
    }

    angular.module('date.directives', []).directive("dateCheck", function () {
        return {
            restrict: "A",
            require: 'ngModel', // element must have ng-model attribute.
            link: function ($scope, $element, $attrs, $ctrl) {
                $ctrl.$validators.dateError = function (modelValue, viewValue) {

                    var fromDate = $scope.$eval($attrs.fromDate),
                        toDate = $scope.$eval($attrs.toDate);

                    console.info("from date ?: ", fromDate);
                    if (!fromDate && !toDate) {
                        return true;
                    }

                    console.info("from date ?: ", fromDate);
                    console.info("to date ?: ", toDate);

                    var value = $scope.$eval($attrs.name);
                    if (!value) {
                        return true;
                    }

                    console.info("value ?: ", value);

                    var value = convertToDateFromString(value),
                        fromDate = convertToDateFromString(fromDate);

                    if (fromDate) {
                        if (fromDate < value) {
                            // it is valid
                            return true;
                        } else {
                            // not valid
                            return false;
                        }
                    }

                    var toDate = convertToDateFromString(toDate);

                    if (toDate) {
                        if (toDate > value) {
                            // it is valid
                            return true;
                        } else {
                            // not valid
                            return false;
                        }
                    }
                };
            }
        };
    });

})(window.angular);
(function (angular) {
    'use strict';

    var app = angular.module('myApp', ['mp.datePicker', 'ngMessages', "date.directives"]);

    var INTEGER_REGEXP = /^-?\d+$/;
    app.directive('integer', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.integer = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });

    app.directive('isZero', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$validators.zerocheck = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (viewValue == 0) {
                        // it is invalid
                        return false;
                    }

                    // it is valid
                    return true;
                };
            }
        };
    });

    app.controller('myController', ['$scope', '$http', function ($scope, $http) {

        $scope.number = 0;
        $scope.errors = [];

        $scope.submit = function () {

            $http({
                method: 'POST',
                url: 'http://localhost:1479/api/reverse',
                data: {
                    'Text': $scope.text,
                    'Number': $scope.number
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(function successCallback(response) {
                $scope.showErrors = false;
                $scope.result = response.data.result;
            }, function errorCallback(response) {
                $scope.showErrors = true;
                $scope.errors = [];
                $scope.result = null;

                if (response.data.error) {
                    $scope.errors.push({
                        key: "",
                        error: response.data.error
                    });
                } else if (response.data.length > 0) {
                    // array
                    var errors = response.data;
                    for (var i = 0; i < errors.length; i++) {
                        $scope.errors.push(errors[i]);
                    }
                }

                setTimeout(function () {
                    $scope.showErrors = false;
                }, 6000);
            });
        };

        $scope.selectFromDate = function () {
            $scope.fromDate = $scope.selectedFromDate;
            $scope.showFromDatePicker = false;
        }

        $scope.selectToDate = function () {
            $scope.toDate = $scope.selectedToDate;
            $scope.showToDatePicker = false;
        }

        $scope.onFromDateFocus = function () {
            $scope.showFromDatePicker = true;
        }

        $scope.onToDateFocus = function () {
            $scope.showToDatePicker = true;
        }

        $scope.formatDate = function (date) {
            function pad(n) {
                return n < 10 ? '0' + n : n;
            }

            return date &&  + pad(date.getMonth() + 1) 
                + '/' + pad(date.getDate())
                + '/' + date.getFullYear() ;
        };
    }]);
})(window.angular);