var app = angular.module('AppAdmin', []);
app.controller("inHDNController", function ($scope, $http, $timeout) {
    //-----------------------------IN HÓA ĐƠN NHẬP--------------------------------
    $scope.maHoaDon;
    $scope.listBill;
    $scope.detailBill = [];
    $scope.getDetailBill = function() {
        var key = 'id';
		var maHoaDon = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);
        $http({
        method: "GET",
        url: current_url_ad + '/api/HoaDonNhap/get-by-id/'+ maHoaDon,
        }).then(function (response) {
        $scope.listBill = response.data;
        $scope.detailBill = $scope.listBill.list_json_chitiethoadonnhap;
        $scope.maHoaDon = maHoaDon;
        });
    }
    $scope.getDetailBill();

    $scope.inHoaDon = function () {
        $timeout(function () {
            window.print();
        }, 2000);
    };
});