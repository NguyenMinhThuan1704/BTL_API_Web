var app = angular.module('AppAdmin', []);
app.controller("HDBController", function ($scope, $http, $timeout) {

    $scope.listHDB;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetHDN();
    };

    $scope.GetHDN = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/HoaDon/searchHDB',
        }).then(function (response) {
            $scope.listHDB = response.data.data;
        });
    };
    $scope.GetHDN();

    $scope.toggleDetails = function(hdn) {
        hdn.showAllDetails = !hdn.showAllDetails;
    };
    

  $scope.editHoaDonBan = function (hdb) {
    var ma_HDB = hdb.maHoaDon;
    var tenkh = hdb.tenKH;
    var diachi = hdb.diaChi;
    var sdt = hdb.sdt;
    var tongtien = hdb.tongGia;

    document.getElementById("MaHDB").value = ma_HDB;
    document.getElementById("TenKH").value = tenkh;
    document.getElementById("DiaChi").value = diachi;
    document.getElementById("SoDienThoai").value = sdt;
    document.getElementById("TongTien").value = tongtien;

    localStorage.setItem('Admin_HDB', JSON.stringify(hdb.list_json_chitiethoadon));
  };

    $scope.$watch(function () {
        var cartItems = JSON.parse(localStorage.getItem('Admin_HDB'))
        return cartItems;
    }, function (newCartAdmin, oldCartAdmin) {
        // Hành động cập nhật giao diện khi có sự thay đổi trong dữ liệu local storage
        if (newCartAdmin !== oldCartAdmin) {
            $scope.cartItems = newCartAdmin;
        }
    }, true);

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listHDB;
        $scope.page = 1;
        var mahd = document.getElementById('mahd').value;
        var tenkh = document.getElementById('tenkh').value;
        mahd = mahd.trim() === "" ? 0 : mahd;
        tenkh = tenkh.trim() === "" ? "" : tenkh;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetHDN();
        };

        $scope.GetHDN = function () {
            $http({
                method: 'POST',
                data: { 
                    page: $scope.page, 
                    pageSize: 10,
                    ma_hd: mahd, 
                    ten_kh: tenkh
                },
                url: current_url_ad + '/api/HoaDon/searchHDB',
            }).then(function (response) {
                $scope.listHDB = response.data.data;
            });
        };
        $scope.GetHDN();
    });
});

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maHDB = target.getAttribute('data-mahdb');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa hóa đơn bán này?");

        if (xacNhan) {
            XoaHDB(maHDB);
        }
    }
});

function XoaHDB(maHDB) {
    fetch(current_url_ad + '/api/HoaDon/delete/' + maHDB, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa hóa đơn bán thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}