(function (angular) {
    'use strict';

    angular.module('date.directives', []).directive("dateCheck", function () {
        return {
            restrict: "A",
            require: 'ngModel', // element must have ng-model attribute.
            link: function ($scope, $element, $attrs, $ctrl) {
                $ctrl.$validators.dateError = function (modelValue, viewValue) {

                    var isToDate = $scope.$eval($attrs.isToDate);
                    //console.info("to date ?: ", isToDate);
                    var value= $scope.$eval($attrs.name);

                    if (!value) {
                        return true;
                    }

                    var splitDate = value.split("/");

                    if (splitDate.length === 0) {
                        return true;
                    }

                    var dateValueMonth = splitDate[0] - 1,
                        dateValueDay = splitDate[1],
                        dateValueYear = splitDate[2],
                        today = new Date();

                    //console.info("blah: ", dateValueYear, dateValueMonth, dateValueDay);

                    var value = new Date(dateValueYear, dateValueMonth, dateValueDay);
                    if (value <= today) {
                        // it is valid
                        return !isToDate;
                    } else {
                        // not valid
                        return isToDate;
                    }
                };
            }
        };
    });

})(window.angular);