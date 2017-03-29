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

                    if (!fromDate && !toDate) {
                        return true;
                    }

                    //console.info("from date ?: ", fromDate);
                    //console.info("to date ?: ", toDate);

                    var value = $scope.$eval($attrs.name);
                    if (!value) {
                        return true;
                    }

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