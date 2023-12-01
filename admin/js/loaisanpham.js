var app = angular.module('AppAdmin', []);
app.controller("LoaiSanPhamController", function ($scope, $http) {

    $scope.listLSP;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetLoaiSanPham();
    };  

    $scope.GetLoaiSanPham = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/LoaiSanPham/search'
        }).then(function (response) {
            $scope.listLSP = response.data.data;
        });
    };
    $scope.GetLoaiSanPham();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listLSP;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetLoaiSanPham();
        };
    
        $scope.GetLoaiSanPham = function () {
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    tenlsp: $scope.tenlsp,
                    noidung: $scope.noidunglsp
                },
                url: current_url_ad + '/api/LoaiSanPham/search',
            }).then(function (response) {
                $scope.listLSP = response.data.data;
            });
        };
        $scope.GetLoaiSanPham();
    });

    $scope.XoaChon = function() {
        var xacNhanXoa = confirm("Bạn có chắc chắn muốn xóa những loại sản phẩm đã chọn?");

        if (xacNhanXoa) {
            var dataToSend = {
                list_json_maloaisp: []
            };

            for (var i = 0; i < $scope.listLSP.length; i++) {
                if ($scope.listLSP[i].selected) {
                    var maLoaiSanPham = $scope.listLSP[i].maLoaiSanPham;
                    var chiTietLSP = {
                        maLoaiSanPham: maLoaiSanPham,
                        ghiChu: 3
                    };
                    dataToSend.list_json_maloaisp.push(chiTietLSP);
                }
            }

            $http({
                method: 'POST',
                data: dataToSend,
                url: current_url_ad + '/api/LoaiSanPham/deleteS_LoaiSanPham',
            }).then(function(response) {
                $scope.listLSP = response.data.data;
                alert("Xóa thành công những loại sản phẩm đã chọn");
                location.reload();
            }).catch(function(error) {
                console.error('Lỗi:', error);
            });
        } else {
            
        }
    };
});

var list = JSON.parse(localStorage.getItem('TypeProduct')) || [];
function ThemLoaiSanPham() {
    var TenLoaiSanPham = document.getElementById("TenLoaiSanPham").value;
    var NoiDung = document.getElementById("NoiDung").value;


    if (TenLoaiSanPham == null || TenLoaiSanPham == "") {
        alert("Tên loại sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (NoiDung == null || NoiDung == "") {
        alert("Nội dung loại sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.MaLoaiSanPham == MaLoaiSanPham) {
                alert("Mã loại sản phẩm đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var TypeProductData = {
        TenLoaiSanPham: TenLoaiSanPham,
        NoiDung: NoiDung
    };

    fetch(current_url_ad + '/api/LoaiSanPham/create-loaisanpham', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(TypeProductData) 
    })
    .then(response => {
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm loại sản phẩm!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}

function NhapMoi() {
    document.getElementById('TenLoaiSanPham').value = '';
    document.getElementById('NoiDung').value = '';
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maLSP = target.getAttribute('data-malsp');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này?");

        if (xacNhan) {
            XoaLSP(maLSP);
        }
    }
});

function XoaLSP(maLSP) {
    fetch(current_url_ad + '/api/LoaiSanPham/delete/' + maLSP, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa loại sản phẩm thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function SuaLSP(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    var MaLoaiSanPham = cells[1].textContent;
    var TenLoaiSanPham = cells[2].textContent;
    var NoiDung = cells[3].textContent;

    document.getElementById("MaLoaiSanPham").value = MaLoaiSanPham;
    document.getElementById("TenLoaiSanPham").value = TenLoaiSanPham;
    document.getElementById("NoiDung").value = NoiDung;
    
    // Lưu mã khách hàng để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-malsp", MaLoaiSanPham);
}

function CapNhat() {
    var MaLoaiSanPham = document.getElementById("btnUpdate").getAttribute("data-malsp");
    var TenLoaiSanPham = document.getElementById("TenLoaiSanPham").value;
    var NoiDung = document.getElementById("NoiDung").value;

    var loaiSanPhamData = {
        MaLoaiSanPham: MaLoaiSanPham,
        TenLoaiSanPham: TenLoaiSanPham,
        NoiDung: NoiDung
    };

    fetch(current_url_ad + '/api/LoaiSanPham/update-loaisanpham', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loaiSanPhamData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin loại sản phẩm thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu');
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
}

