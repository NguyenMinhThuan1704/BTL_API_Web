var app = angular.module('AppAdmin', []);
app.controller("TongQuanCtrl", function ($scope, $http) {
$scope.tk;  
$scope.LoadTaiKhoan = function () { 
    var key = 'id';
    var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
    $http({
        method: 'GET', 
        url: current_url_ad + '/api/User/get-by-id/'+value,
    }).then(function (response) { 
        $scope.tk = response.data;
    });
};  
$scope.LoadTaiKhoan()
});
