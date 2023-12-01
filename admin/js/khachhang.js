var app = angular.module('AppAdmin', []);
app.controller("KhachController", function ($scope, $http) {

    $scope.listKH;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetKhachHang();
    };

    $scope.GetKhachHang = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/Khach/search',
        }).then(function (response) {
            $scope.listKH = response.data.data;
        });
    };
    $scope.GetKhachHang();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listKH;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetKhachHang();
        };
    
        $scope.GetKhachHang = function () {
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    ten_khach: $scope.tenkh,
                    dia_chi: $scope.diachikh
                },
                url: current_url_ad + '/api/Khach/search',
            }).then(function (response) {
                $scope.listKH = response.data.data;
            });
        };
        $scope.GetKhachHang();
    });

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những khách hàng đã chọn?");

        if (xacNhanXoa) {
            var dataToSend = {
                list_json_makhachhang: []
            };

            for (var i = 0; i < $scope.listKH.length; i++) {
                if ($scope.listKH[i].selected) {
                    var maKH = $scope.listKH[i].maKH;
                    var chiTietKH = {
                        maKH: maKH,
                        ghiChu: 3
                    };
                    dataToSend.list_json_makhachhang.push(chiTietKH);
                }
            }

            $http({
                method: 'POST',
                data: dataToSend,
                url: current_url_ad + '/api/Khach/deleteS_Khachhang',
            }).then(function(response) {
                $scope.listKH = response.data.data;
                alert("Xóa thành công những khách hàng đã chọn");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {

        }
    };
});


var list = JSON.parse(localStorage.getItem('Customer')) || [];
function ThemKhachHang() {
    // var MaKH = document.getElementById("MaKH").value;
    var TenKH = document.getElementById("TenKH").value;
    var SDT = document.getElementById("SDT").value;
    var Email = document.getElementById("Email").value;
    var DiaChi = document.getElementById("DiaChi").value;
    
    var number = /^[0-9]+$/;
    var atposition = Email.indexOf("@");
    var dotposition = Email.lastIndexOf(".");

    if (TenKH == null || TenKH == "") {
        alert("Tên khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (!SDT.match(number) || SDT.length != 10) {
        alert("Số điện thoại khách hàng phải là kiểu số và có độ dài là 10 ký tự! Vui lòng nhập lại!");
        return false;
    }
    else if (Email != "" && Email != null && (atposition < 1 || dotposition < (atposition + 2) || (dotposition + 2) >= Email.length)) {
        alert("Email khách hàng không hợp lệ! Vui lòng nhập lại!");
        return false;
    }
    else if (DiaChi == null || DiaChi == "") {
        alert("Địa chỉ khách hàng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.MaKH == MaKH) {
                alert("Mã khách hàng đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var customerData = {
        // MaKH: MaKH,
        TenKH: TenKH,
        SDT: SDT,
        Email: Email,
        DiaChi: DiaChi
    };
    // Gửi dữ liệu lên API
    fetch(current_url_ad + '/api/Khach/create-khach', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData) 
    })
    .then(response => {
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm khách hàng!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}

function NhapMoi() {
    // document.getElementById('MaKH').value = '';
    document.getElementById('TenKH').value = '';
    document.getElementById('SDT').value = '';
    document.getElementById('Email').value = '';
    document.getElementById('DiaChi').value = '';
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maKH = target.getAttribute('data-makh');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa khách hàng này?");

        if (xacNhan) {
            XoaKhachHangTuCSDL(maKH);
        }
    }
});

function XoaKhachHangTuCSDL(maKH) {
    fetch(current_url_ad + '/api/Khach/delete/' + maKH, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa khách hàng thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function SuaKhachHang(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    var maKH = cells[1].textContent;
    var tenKH = cells[2].textContent;
    var diaChi = cells[3].textContent;
    var sdt = cells[4].textContent;
    var email = cells[5].textContent; 

    document.getElementById("MaKH").value = maKH;
    document.getElementById("TenKH").value = tenKH;
    document.getElementById("DiaChi").value = diaChi;
    document.getElementById("SDT").value = sdt;
    document.getElementById("Email").value = email;
    
    // Lưu mã khách hàng để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-makh", maKH);
}

function CapNhat() {
    var maKH = document.getElementById("btnUpdate").getAttribute("data-makh");
    var tenKH = document.getElementById("TenKH").value;
    var diaChi = document.getElementById("DiaChi").value;
    var sdt = document.getElementById("SDT").value;
    var email = document.getElementById("Email").value;

    var khachHangData = {
        maKH: maKH,
        tenKH: tenKH,
        diaChi: diaChi,
        sdt: sdt,
        email: email
    };

    // Tạo yêu cầu fetch để gửi dữ liệu cập nhật lên máy chủ
    fetch(current_url_ad + '/api/Khach/update-khach', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(khachHangData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin khách hàng thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu');
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
    
}



