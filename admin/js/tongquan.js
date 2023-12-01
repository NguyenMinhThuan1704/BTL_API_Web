var app = angular.module('AppAdmin', []);
app.controller("TongQuanCtrl", function ($scope, $http) {
    // $scope.tk;  
    // $scope.LoadTaiKhoan = function () { 
    //     var key = 'id';
    //     var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
    //     $http({
    //         method: 'GET', 
    //         url: current_url_ad + '/api/User/get-by-id/'+value,
    //     }).then(function (response) { 
    //         $scope.tk = response.data;
    //     });
    // };  
    // $scope.LoadTaiKhoan()

    $scope.sanphammoinhat;
    $scope.GetMoiNhat= function () {
        $http({
            method: 'GET',
            url: current_url_ad + '/api/SanPham/Select-sanphamtheochucnang/4',
        }).then(function (response) {  
            $scope.sanphammoinhat = response.data;  
        });
    };   
	$scope.GetMoiNhat();

    $scope.banchaynhat;
    $scope.GetBanChayNhat = function () {
        $http({
            method: 'GET',
            url: current_url_ad + '/api/SanPham/Select-sanphamtheochucnang/1',
        }).then(function (response) {  
            $scope.banchaynhat = response.data;  

        });
    };   
	$scope.GetBanChayNhat();

    $scope.listTKe_date = {};
    $scope.GetThongKeNgay = function () {
        $http({
            method: 'GET',
            url: current_url_ad + '/api/ThongKe/Select-thongke-ngay',
        }).then(function (response) {  
            $scope.listTKe_date = response.data;
        });
    };
    $scope.GetThongKeNgay();

    $scope.listTKe_week = {};
    $scope.GetThongKeTuan = function () {
        $http({
            method: 'GET',
            url: current_url_ad + '/api/ThongKe/Select-thongke-tuan',
        }).then(function (response) {  
            $scope.listTKe_week = response.data;
        });
    };
    $scope.GetThongKeTuan();

    $scope.listTKe_month = {};
    $scope.GetThongKeThang = function () {
        $http({
            method: 'GET',
            url: current_url_ad + '/api/ThongKe/Select-thongke-thang',
        }).then(function (response) {  
            $scope.listTKe_month = response.data;
        });
    };
    $scope.GetThongKeThang();

    $scope.listTKe_year = {};
    $scope.GetThongKeNam = function () {
        $http({
            method: 'GET',
            url: current_url_ad + '/api/ThongKe/Select-thongke-nam',
        }).then(function (response) {  
            $scope.listTKe_year = response.data;
        });
    };
    $scope.GetThongKeNam();
});
