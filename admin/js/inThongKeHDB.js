var app = angular.module('AppAdmin', []);
app.controller("InThongKeHDBController", function ($scope, $http, $timeout) {
    var params = new URLSearchParams(window.location.search);
    var fr_ngaytao = params.get('fr_ngaytao');
    var to_ngaytao = params.get('to_ngaytao');
    var tenkh = params.get('tenkh');
    tenkh = tenkh.trim() === "" ? "" : tenkh;
    $scope.fr_ngaytao = fr_ngaytao;
    $scope.to_ngaytao = to_ngaytao;
    $scope.tenkh = tenkh;

    $scope.listHDB;
    $scope.calculateTotal_HDB = function () {
        $scope.totalQuantity_hdb = 0;
        $scope.totalAmount_hdb = 0;
        $scope.totalItems_hdb = 0;

    
        for (var i = 0; i < $scope.listHDB.length; i++) {
            $scope.totalQuantity_hdb += parseInt($scope.listHDB[i].soLuong);
            $scope.totalAmount_hdb += parseFloat($scope.listHDB[i].tongGia);
            $scope.totalItems_hdb = $scope.listHDB.length;
        }
    };

    $scope.ThongKeHDB = function () {
        var tenkh = $scope.tenkh;
        var fr_ngaytao = $scope.fr_ngaytao;
        var to_ngaytao = $scope.to_ngaytao;
        $http({
            method: 'POST',
            data: {
                page: 1,
                pageSize: 100,
                ten_khach: tenkh,
                fr_NgayTao: fr_ngaytao,
                to_NgayTao: to_ngaytao
            },
            url: current_url_ad + '/api/HoaDon/thongke',
        }).then(function (response) {
            $scope.listHDB = response.data.data;
            $scope.calculateTotal_HDB();
        });
    };
    $scope.ThongKeHDB();

    $scope.inHoaDon = function () {
        $timeout(function () {
            window.print();
        }, 2000);
    };
});