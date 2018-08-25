var oficio = angular.module("vlep", ["ngAnimate"]);
oficio.controller("vlepCtrl", function ($scope, $http) {
    console.log("Script loaded...");
    $scope.getStudents = function () {
        console.log("Entering getStudents");
        $http.get("php/getStudents.php")
            .success(function(data, status, headers, config) {
                if (data != null){
                    $scope.students = data;
                }
                console.log(data, status);                                        
            })
            .error(function(data, status, headers, config) {
                switch(status) {
                    case 401: {
                        $scope.message = "You must be authenticated!"
                    break;
                    }
                    case 500: {
                        $scope.message = "Something went wrong!";
                    break;
                    }
                }
            console.log(data, status);
        });
    };     
    $scope.getStudents();
});