var app = angular.module('AppAdmin', []);
app.controller("TaiKhoanController", function ($scope, $http) {

    $scope.listTK;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetTaiKhoan();
    };

    $scope.GetTaiKhoan = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/User/search',
        }).then(function (response) {
            $scope.listTK = response.data.data;
        });
    };

    $scope.GetTaiKhoan();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listTK;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetTaiKhoan();
        };
    
        $scope.GetTaiKhoan = function () {
            loaitk = 0;
            var loaitk = document.getElementById('TenLoaiTaiKhoan1').value;
            console.log(loaitk)
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    ten_tk: $scope.tentk,
                    maloaitk: loaitk
                },
                url: current_url_ad + '/api/User/search',
            }).then(function (response) {
                $scope.listTK = response.data.data;
            });
        };
        $scope.GetTaiKhoan();
    });
    
    $scope.listLTK;
    $scope.GetLoaiTaiKhoan = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 20 },
            url: current_url_ad + '/api/LoaiTaiKhoan/search'
        }).then(function (response) {
            $scope.listLTK = response.data.data;
        });
    };
    $scope.GetLoaiTaiKhoan();

});

function ThemTaiKhoan() {

    var loaiTaiKhoan = document.getElementById('TenLoaiTaiKhoan').value;
    var tenTaiKhoan = document.getElementById('TenTaiKhoan').value;
    var matKhau = document.getElementById('MatKhau').value;
    var email = document.getElementById('Email').value;

    if (loaiTaiKhoan == null || loaiTaiKhoan == "") {
        alert("Loại sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (tenTaiKhoan == null || tenTaiKhoan == "") {
        alert("Tên sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (matKhau == null || matKhau == "") {
        alert("Giá không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (email == null || email == "") {
        alert("Giá giảm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        console.log("Dữ liệu hợp lệ!")
    }

    var taikhoanData = {
        loaiTaiKhoan: loaiTaiKhoan,
        tenTaiKhoan: tenTaiKhoan,
        matKhau: matKhau,
        email: email
    };
    
    fetch(current_url_ad + '/api/User/create-taikhoan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taikhoanData) 
    })
    .then(response => {
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm tài khoản!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}

function NhapMoi() {
    document.getElementById('TenLoaiTaiKhoan').value = '';
    document.getElementById('TenTaiKhoan').value = '';
    document.getElementById('MatKhau').value = '';
    document.getElementById('Email').value = '';
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maTaiKhoan = target.getAttribute('data-matk');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa tài khoản này?");

        if (xacNhan) {
            XoaTaiKhoan(maTaiKhoan);
        }
    }
});

function XoaTaiKhoan(maTaiKhoan) {
    fetch(current_url_ad + '/api/User/delete/' + maTaiKhoan, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa tài khoản thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function SuaTaiKhoan(icon) {
    var maTaiKhoan = icon.getAttribute("data-matk");
    var maLoaiTaiKhoan = icon.getAttribute("data-maloaitk");
    var tenTaiKhoan = icon.getAttribute("data-tentk");
    var matKhau = icon.getAttribute("data-matkhau");
    var email = icon.getAttribute("data-email");

    document.getElementById("MaTK").value = maTaiKhoan;
    document.getElementById("TenLoaiTaiKhoan").value = maLoaiTaiKhoan;
    document.getElementById("TenTaiKhoan").value = tenTaiKhoan;
    document.getElementById("MatKhau").value = matKhau;
    document.getElementById("Email").value = email;
}

function CapNhat() {
    var maTaiKhoan =  document.getElementById('MaTK').value;
    var maLoaiTaiKhoan = document.getElementById('TenLoaiTaiKhoan').value;
    var tenTaiKhoan = document.getElementById('TenTaiKhoan').value;
    var matKhau = document.getElementById('MatKhau').value;
    var email = document.getElementById('Email').value;

    var taikhoanData = {
        maTaiKhoan: maTaiKhoan,
        loaiTaiKhoan: maLoaiTaiKhoan,
        tenTaiKhoan: tenTaiKhoan,
        matKhau: matKhau,
        email: email
    };

    fetch(current_url_ad + '/api/User/update-taikhoan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taikhoanData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin tài khoản thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu' + error);
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
    
}



