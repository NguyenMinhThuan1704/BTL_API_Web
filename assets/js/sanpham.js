var app = angular.module('AppAdmin', []);
app.controller("SanPhamController", function ($scope, $http) {

    // Hàm để thêm sản phẩm vào giỏ hàng
    $scope.addToCart = function (product) {
        // Kiểm tra xem local storage có được hỗ trợ không
        if (typeof(Storage) !== "undefined") {
            // Lấy các sản phẩm trong giỏ hàng từ local storage hoặc khởi tạo một mảng rỗng nếu chưa có
            var cartItems = JSON.parse(localStorage.getItem('cartAdmin')) || [];

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            var existingProduct = cartItems.find(item => item.maSanPham === product.maSanPham);

            if (existingProduct) {
                // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng hoặc thông tin liên quan khác
                existingProduct.soLuong += 1;
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm nó vào giỏ hàng
                cartItems.push({
                    maSanPham: product.maSanPham,
                    tenSanPham: product.tenSanPham,
                    anhDaiDien: product.anhDaiDien,
                    giaGiam: product.giaGiam,
                    gia: product.gia,
                    soLuong: 1 
                });
            }

            // Lưu các sản phẩm trong giỏ hàng đã cập nhật trở lại local storage
            localStorage.setItem('cartAdmin', JSON.stringify(cartItems));

            alert('Đã thêm sản phẩm hóa đơn nhập!');
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };

    $scope.listSP;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetSanPham();
    };

    $scope.GetSanPham = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/SanPham/search',
        }).then(function (response) {
            $scope.listSP = response.data.data;
        });
    };
    $scope.GetSanPham();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listSP;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetSanPham();
        };
    
        $scope.GetSanPham = function () {
            loaiSanPham = 0;
            var loaiSanPham = document.getElementById('TenLoaiSanPham1').value;
        
            console.log(loaiSanPham)
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    ten_sp: $scope.tensp,
                    maloaisp: loaiSanPham
                },
                url: current_url_ad + '/api/SanPham/search',
            }).then(function (response) {
                $scope.listSP = response.data.data;
            });
        };
        $scope.GetSanPham();
    });
    
    $scope.listLSP;
    $scope.GetLoaiSanPham = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 20 },
            url: current_url_ad + '/api/LoaiSanPham/search'
        }).then(function (response) {
            $scope.listLSP = response.data.data;
        });
    };

    $scope.GetLoaiSanPham();

});

// var list = JSON.parse(localStorage.getItem('Product')) || [];

function loadFile(event) {
    var image = document.getElementById('viewimg');
    image.src = URL.createObjectURL(event.target.files[0]);
}
function ThemSanPham() {

    var maLoaiSanPham = document.getElementById('TenLoaiSanPham').value;
    var tenSanPham = document.getElementById('TenSanPham').value;
    var gia = document.getElementById('Gia').value;
    var giaGiam = document.getElementById('GiaGiam').value;
    var soLuong = document.getElementById('SoLuong').value;
    var trangThai = true;

    if (maLoaiSanPham == null || maLoaiSanPham == "") {
        alert("Loại sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    } 
    else if (tenSanPham == null || tenSanPham == "") {
        alert("Tên sản phẩm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (gia == null || gia == "") {
        alert("Giá không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (giaGiam == null || giaGiam == "") {
        alert("Giá giảm không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (soLuong == null || soLuong == "") {
        alert("Số lượng không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        console.log("Dữ liệu hợp lệ!")
    }

    var anhDaiDien = document.getElementById("AnhDaiDien");
    var image = document.getElementById('viewimg');
    var newImagePath = "./assets/img/Product/Đèn chùm/" + anhDaiDien.value.split("\\").pop();
    image.src = newImagePath;

    var sanPham = {
        maLoaiSanPham: maLoaiSanPham,
        tenSanPham: tenSanPham,
        anhDaiDien: newImagePath,
        gia: gia,
        giaGiam: giaGiam,
        soLuong: soLuong,
        trangThai: trangThai
    };
    
    fetch(current_url_ad + '/api/SanPham/create-sanpham', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanPham) 
    })
    .then(response => {
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm sản phẩm!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}

function NhapMoi() {
    document.getElementById('TenLoaiSanPham').value = '';
    document.getElementById('TenSanPham').value = '';
    document.getElementById('AnhDaiDien').value = '';
    document.getElementById('Gia').value = '';
    document.getElementById('GiaGiam').value = '';
    document.getElementById('SoLuong').value = '';
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maSanPham = target.getAttribute('data-masp');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");

        if (xacNhan) {
            XoaSanPham(maSanPham);
        }
    }
});

function XoaSanPham(maSanPham) {
    fetch(current_url_ad + '/api/SanPham/delete/' + maSanPham, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa sản phẩm thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function SuaSanPham(icon) {
    var maSanPham = icon.getAttribute("data-masp");
    var maLoaiSanPham = icon.getAttribute("data-maloaisanpham");
    var tenSanPham = icon.getAttribute("data-tensanpham");
    var anhDaiDien = icon.getAttribute("data-anhdaidien");
    var gia = icon.getAttribute("data-gia");
    var giaGiam = icon.getAttribute("data-giagiam");
    var soLuong = icon.getAttribute("data-soluong");
    var trangThai = icon.getAttribute("data-trangthai");
    console.log(anhDaiDien);

    document.getElementById("MaSP").value = maSanPham;
    document.getElementById("TenLoaiSanPham").value = maLoaiSanPham;
    document.getElementById("TenSanPham").value = tenSanPham;
    
    var viewimg = document.getElementById("viewimg");
    viewimg.src = '.' + anhDaiDien;

    document.getElementById("Gia").value = gia;
    document.getElementById("GiaGiam").value = giaGiam;
    document.getElementById("SoLuong").value = soLuong;

    if (trangThai === "true") {
        document.getElementById("TrangThai").checked = true;
    } else {
        document.getElementById("TrangThai").checked = false;
    }
}

function CapNhat() {
    var maSanPham =  document.getElementById('MaSP').value;
    var maLoaiSanPham = document.getElementById('TenLoaiSanPham').value;
    var tenSanPham = document.getElementById('TenSanPham').value;
    var gia = document.getElementById('Gia').value;
    var giaGiam = document.getElementById('GiaGiam').value;
    var soLuong = document.getElementById('SoLuong').value;
    var trangThai = true;

    var anhDaiDien = document.getElementById("AnhDaiDien");
    var image = document.getElementById('viewimg');
    var newImagePath = "./assets/img/Product/Đèn chùm/" + anhDaiDien.value.split("\\").pop();
    image.src = newImagePath;

    var sanphamData = {
        maSanPham: maSanPham,
        maLoaiSanPham: maLoaiSanPham,
        tenSanPham: tenSanPham,
        anhDaiDien: newImagePath,
        gia: gia,
        giaGiam: giaGiam,
        soLuong: soLuong,
        trangThai: trangThai
    };

    fetch(current_url_ad + '/api/SanPham/update-sanpham', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sanphamData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin sản phẩm thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu' + error);
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
    
}



