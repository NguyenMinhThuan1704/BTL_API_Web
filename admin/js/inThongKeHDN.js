var app = angular.module('AppAdmin', []);
app.controller("InThongKeHDNController", function ($scope, $http, $timeout) {
    var params = new URLSearchParams(window.location.search);
    var fr_ngaytao = params.get('fr_ngaytao');
    var to_ngaytao = params.get('to_ngaytao');
    var maNhanVien = params.get('maNhanVien');
    var maNPP = params.get('maNPP');
    $scope.fr_ngaytao = fr_ngaytao;
    $scope.to_ngaytao = to_ngaytao;
    $scope.maNhanVien = maNhanVien;
    $scope.maNPP = maNPP;

    $scope.listHDN;
    $scope.calculateTotal_HDN = function () {
        $scope.totalQuantity_hdn = 0;
        $scope.totalAmount_hdn = 0;
        $scope.totalItems_hdn = 0;

    
        for (var i = 0; i < $scope.listHDN.length; i++) {
            $scope.totalQuantity_hdn += parseInt($scope.listHDN[i].soLuong);
            $scope.totalAmount_hdn += parseFloat($scope.listHDN[i].tongTien);
            $scope.totalItems_hdn = $scope.listHDN.length;
        }
    };

    $scope.ThongKeHDN = function () {
        var maNhanVien = $scope.maNhanVien;
        var maNPP = $scope.maNPP;
        var fr_ngaytao = $scope.fr_ngaytao;
        var to_ngaytao = $scope.to_ngaytao;
        $http({
            method: 'POST',
            data: {
                page: 1,
                pageSize: 100,
                ma_nv: maNhanVien,
                ma_npp: maNPP,
                fr_NgayTao: fr_ngaytao,
                to_NgayTao: to_ngaytao
            },
            url: current_url_ad + '/api/HoaDonNhap/thongke_hoadonnhap',
        }).then(function (response) {
            $scope.listHDN = response.data.data;
            $scope.buy = $scope.listHDN.kieuThanhToan;
            $scope.calculateTotal_HDN();
        });
    };
    $scope.ThongKeHDN();

    $scope.inHoaDon = function () {
        $timeout(function () {
            window.print();
        }, 2000);
    };
});