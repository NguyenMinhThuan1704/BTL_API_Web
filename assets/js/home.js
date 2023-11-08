var app = angular.module('AppBanHang', []);
app.controller("HomeCtrl", function ($scope, $http) {

    // -------------TRANG CHỦ---------------
    $scope.listItem;
    $scope.GetDenChum = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 8, maloaisp: 2},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {  
            $scope.listItem = response.data.data;  

        });
    };   
	$scope.GetDenChum();

    $scope.listDenMam;
    $scope.GetDenMam = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 8, maloaisp: 3},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {  
            $scope.listDenMam = response.data.data;  

        });
    };   
	$scope.GetDenMam();

    $scope.sanphammoinhat;
    $scope.GetMoiNhat= function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/Select-sanphamtheochucnang/4',
        }).then(function (response) {  
            $scope.sanphammoinhat = response.data;  

        });
    };   
	$scope.GetMoiNhat();

    $scope.banchaynhat;
    $scope.GetBanChayNhat = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/Select-sanphamtheochucnang/1',
        }).then(function (response) {  
            $scope.banchaynhat = response.data;  

        });
    };   
	$scope.GetBanChayNhat();

    $scope.listTK;
    $scope.GetTaiKhoan = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/User/Select-all-taikhoan',
        }).then(function (response) {  
            $scope.listTK = response.data;
        });
    };   
	$scope.GetTaiKhoan();
    
});
