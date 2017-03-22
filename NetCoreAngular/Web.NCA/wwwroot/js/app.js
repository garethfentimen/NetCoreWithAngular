(function () {
    'use strict';

    angular.module("myApp", [])
        .controller("myController", ['$scope', '$http', function ($scope, $http) {

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
        }]);;
})();