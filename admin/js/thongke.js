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
    document.getElementById('btnSearch1').addEventListener('click', function() {
        $scope.listHDN;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.ThongKeHDN();
        };

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
            maNhanVien = 0;
            maNPP = 0;
            var maNhanVien = document.getElementById('TenNhanVien').value;
            var maNPP = document.getElementById('TenNPP').value;
            maNhanVien = maNhanVien.trim() === "" ? 0 : maNhanVien;
            maNPP = maNPP.trim() === "" ? 0 : maNPP;
            var fr_ngaytao = document.getElementById('search-export-fr-hdn').value;
            var to_ngaytao = document.getElementById('search-export-to-hdn').value;
            if (fr_ngaytao === '' || to_ngaytao === '') {
                alert('Vui lòng nhập thời gian cần thống kê.');
            } else {
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
                    url: current_url_ad + '/api/HoaDonNhap/thongke_hoadonnhap',
                }).then(function (response) {
                    $scope.listHDN = response.data.data;
                    $scope.calculateTotal_HDN();
                });
            }
        };
        $scope.ThongKeHDN();
    });

    document.getElementById('btnSearch2').addEventListener('click', function() {
        $scope.listHDB;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.ThongKeHDB();
        };

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
            var fr_ngaytao = document.getElementById('search-export-fr-hdb').value;
            var to_ngaytao = document.getElementById('search-export-to-hdb').value;
            if (fr_ngaytao === '' || to_ngaytao === '') {
                alert('Vui lòng nhập thời gian cần thống kê.');
            } else {
                $http({
                    method: 'POST',
                    data: {
                        page: $scope.page,
                        pageSize: 10,
                        ten_khach: $scope.tenkh,
                        fr_NgayTao: fr_ngaytao,
                        to_NgayTao: to_ngaytao
                    },
                    url: current_url_ad + '/api/HoaDon/thongke',
                }).then(function (response) {
                    $scope.listHDB = response.data.data;
                    $scope.calculateTotal_HDB();
                });
            }
        };
        $scope.ThongKeHDB();
    });
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;

    // Ẩn tất cả các nội dung tab
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Xóa hiệu ứng active cho tất cả các nút tab
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Hiển thị nội dung tab hiện tại và thêm hiệu ứng active cho nút tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
