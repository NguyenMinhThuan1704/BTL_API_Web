var app = angular.module('AppAdmin', []);
app.controller("HDNController", function ($scope, $http) {

    $scope.listCTTK;
    $scope.GetCTTK = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 20 },
            url: current_url_ad + '/api/ChiTietTaiKhoan/search'
        }).then(function (response) {
            $scope.listCTTK = response.data.data;
        });
    };
    $scope.GetCTTK();

    $scope.listNPP;
    $scope.GetNPP = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 100 },
            url: current_url_ad + '/api/NhaPhanPhoi/search'
        }).then(function (response) {
            $scope.listNPP = response.data.data;
        });
    };
    $scope.GetNPP();

    $scope.listHDN;
    // $scope.page = 1;
    // $scope.changePage = function (pageNum) {
    //     $scope.page = pageNum;
    //     $scope.GetHDN();
    // };

    // $scope.GetHDN = function () {
    //     $http({
    //         method: 'POST',
    //         data: { page: $scope.page, pageSize: 10 },
    //         url: current_url_ad + '/api/HoaDonNhap/searchHDN',
    //     }).then(function (response) {
    //         $scope.listHDN = response.data.data;
    //     });
    // };
    // $scope.GetHDN();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listHDN;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.ThongKeHDN();
        };

        $scope.calculateTotal = function () {
            $scope.totalQuantity = 0;
            $scope.totalAmount = 0;
            $scope.totalItems = 0;

        
            for (var i = 0; i < $scope.listHDN.length; i++) {
                $scope.totalQuantity += parseInt($scope.listHDN[i].soLuong);
                $scope.totalAmount += parseFloat($scope.listHDN[i].tongTien);
                $scope.totalItems = $scope.listHDN.length;
            }
        };
    
        $scope.ThongKeHDN = function () {
            maNhanVien = 0;
            maNPP = 0;
            var maNhanVien = document.getElementById('TenNhanVien').value;
            var maNPP = document.getElementById('TenNPP').value;
            maNhanVien = maNhanVien.trim() === "" ? 0 : maNhanVien;
            maNPP = maNPP.trim() === "" ? 0 : maNPP;
            var fr_ngaytao = document.getElementById('search-export-fr').value;
            var to_ngaytao = document.getElementById('search-export-to').value;
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    ma_nv: maNhanVien,
                    ma_npp: maNPP,
                    fr_NgayTao: fr_ngaytao,
                    to_NgayTao: to_ngaytao
                },
                url: current_url_ad + '/api/HoaDonNhap/thongke_hoadonnhap   ',
            }).then(function (response) {
                $scope.listHDN = response.data.data;
                // $scope.totalItems = $scope.listHDN.length; 
                $scope.calculateTotal();
            });
        };
        $scope.ThongKeHDN();
    });
});
