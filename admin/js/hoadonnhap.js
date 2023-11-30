var app = angular.module('AppAdmin', []);
app.controller("HDNController", function ($scope, $http, $timeout) {

    $scope.cthdn;
    $scope.GetCTHDN = function () {
        var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);	
        if (value === '') {
            var invoiceDetailsElement = document.getElementById('invoiceDetails');
            if (invoiceDetailsElement) {
                invoiceDetailsElement.style.display = 'none';
            }
        } else {
            var invoiceDetailsElement = document.getElementById('invoiceDetails');
            if (invoiceDetailsElement) {
                invoiceDetailsElement.style.display = 'block';
            }
        }	
        var result = (value === '') ? 0 : value;
        console.log(result); 
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 10, ma_hd: result}, 
            url: current_url_ad + '/api/ChiTietHDN/search'
        }).then(function (response) {
            $scope.cthdn = response.data.data;
        });
    };
    $scope.GetCTHDN();
    

  $scope.getCartItems = function () {
      if (typeof(Storage) !== "undefined") {
          var cartItems = JSON.parse(localStorage.getItem('cartAdmin')) || [];
          $scope.cartItems = cartItems;
      } else {
          console.error('Local storage không được hỗ trợ');
      }
  };
  $scope.getCartItems();

    // Hàm tăng số lượng sản phẩm
    $scope.incrementQuantity = function (item) {
    item.soLuong++;
    $scope.saveCart();
  };

  // Hàm giảm số lượng sản phẩm
  $scope.decrementQuantity = function (item) {
      if (item.soLuong > 1) {
          item.soLuong--;
          $scope.saveCart();
      }
  };

  // Hàm lưu thay đổi vào local storage
  $scope.saveCart = function () {
      if (typeof(Storage) !== "undefined") {
          localStorage.setItem('cartAdmin', JSON.stringify($scope.cartItems));
      }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  $scope.removeFromCart = function (index) {
    $scope.cartItems.splice(index, 1);
    $scope.saveCart();
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  $scope.confirmDelete = function (item) {
    var confirmation = confirm("Bạn có chắc muốn xóa sản phẩm này khỏi hóa đơn nhập?");
    if (confirmation) {
        $scope.removeFromCart($scope.cartItems.indexOf(item));
        console.log($scope.cartItems.indexOf(item));
    }
  };

  $scope.giaNhap = function (item) {
    return item.giaGiam - item.giaGiam * 0.2;
  };

  // Hàm tính tổng giá của một sản phẩm
  $scope.calculateTotalPriceForItem = function (item) {
    var giaNhap = item.giaGiam - (item.giaGiam * 0.2);
    
    return giaNhap * item.soLuong;
  };

  // Hàm xóa hết dữ liệu trong giỏ hàng
  $scope.clearCart = function () {
    var confirmation = confirm("Bạn có chắc muốn xóa toàn bộ sản phẩm khỏi hóa đơn nhập?");
    if (confirmation) {
        localStorage.removeItem('cartAdmin');
        $scope.cartItems = [];
    } else {
        console.error('Local storage không được hỗ trợ');
    }
  };

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
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetHDN();
    };

    $scope.GetHDN = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/HoaDonNhap/searchHDN',
        }).then(function (response) {
            $scope.listHDN = response.data.data;
        });
    };
    $scope.GetHDN();

    $scope.toggleDetails = function(hdn) {
        hdn.showAllDetails = !hdn.showAllDetails;
    };

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listHDN;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetHDN();
        };
    
        $scope.GetHDN = function () {
            var maNhanVien = document.getElementById('TenNhanVien1').value;
            var maNPP = document.getElementById('TenNPP1').value;
            var mahdn = document.getElementById('mahdn').value;
            maNhanVien = maNhanVien.trim() === "" ? 0 : maNhanVien;
            maNPP = maNPP.trim() === "" ? 0 : maNPP;
            mahdn = mahdn.trim() === "" ? 0 : mahdn;
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    ma_hdn: mahdn,
                    ma_nv: maNhanVien,
                    ma_npp: maNPP,
                },
                url: current_url_ad + '/api/HoaDonNhap/searchHDN',
            }).then(function (response) {
                $scope.listHDN = response.data.data;
            });
        };
        $scope.GetHDN();
    });
    

   $scope.addHoaDonNhapCSDL = function () {
    var maNhanVien = document.getElementById('TenNhanVien').value;
    var maNhaPhanPhoi = document.getElementById('TenNPP').value;

    if (!maNhanVien || !maNhaPhanPhoi|| !$scope.kieuThanhToan) {
      return alert("Thông tin nhập thiếu! Vui lòng kiểm tra lại");
    }

    var dataToSend = {
        maNhaPhanPhoi: $scope.nhaPhanPhoi,
        maTaiKhoan: maNhanVien,
        kieuThanhToan: $scope.kieuThanhToan,
        list_json_chitiethoadonnhap: []
    };

    // Lặp qua danh sách sản phẩm trong giỏ hàng và thêm vào list_json_chitiethoadonnhap
    for (var i = 0; i < $scope.cartItems.length; i++) {
        var item = $scope.cartItems[i];
        var chiTietHoaDonNhap = {
            maSanPham: item.maSanPham,
            soLuong: item.soLuong,
            donViTinh: $scope.donViTinh,
            giaNhap: $scope.giaNhap(item),
            tongTien: $scope.calculateTotalPriceForItem(item),
            ghiChu: 1
        };
        dataToSend.list_json_chitiethoadonnhap.push(chiTietHoaDonNhap);
      }

    $http({
        method: 'POST',
        data: dataToSend,
        url: current_url_ad + '/api/HoaDonNhap/create-hoadonnhap',
    }).then(function (response) {
        console.log(response.data);
        alert("Thêm hóa đơn nhập thành công!")
        localStorage.removeItem('cartAdmin');
        location.reload();
    });
  };

  $scope.editHoaDonNhap = function (hdn) {
    var ma_HDN = hdn.maHoaDonNhap;
    var nv = hdn.maTaiKhoan;
    var npp = hdn.maNhaPhanPhoi;
    var kieuthanhtoan = hdn.kieuThanhToan;
    var tongtien = hdn.tongTien;
    var donvitinh = "Cái";

    document.getElementById("MaHDN").value = ma_HDN;
    document.getElementById("TenNhanVien").value = nv;
    document.getElementById("TenNPP").value = npp;
    document.getElementById("KieuThanhToan").value = kieuthanhtoan;
    document.getElementById("donViTinh").value = donvitinh;
    document.getElementById("TongTien").value = tongtien;

    localStorage.setItem('cartAdmin', JSON.stringify(hdn.list_json_chitiethdn));
  };

    $scope.$watch(function () {
        var cartItems = JSON.parse(localStorage.getItem('cartAdmin'))
        return cartItems;
    }, function (newCartAdmin, oldCartAdmin) {
        // Hành động cập nhật giao diện khi có sự thay đổi trong dữ liệu local storage
        if (newCartAdmin !== oldCartAdmin) {
            $scope.cartItems = newCartAdmin;
        }
    }, true);

    $scope.toggleInvoiceDetails = function() {
        var invoiceDetailsElement = document.getElementById('invoiceDetails');
        if (invoiceDetailsElement) {
            invoiceDetailsElement.style.display = 'none';
        }else {
            invoiceDetailsElement.style.display = 'block';
        }	
    };

   $scope.updateHoaDonNhapCSDL = function () {
    var maNhanVien = document.getElementById('TenNhanVien').value;
    var maNhaPhanPhoi = document.getElementById('TenNPP').value;
    var ghichu = document.getElementById("ghichu").value;
    var kieuThanhToan = document.getElementById('KieuThanhToan').value;
    var maHDN = document.getElementById('MaHDN').value;
    var maCTHDN = document.getElementById('MaCTHDN').value;
    var donViTinh = document.getElementById('donViTinh').value;

    console.log(ghichu);
    console.log(maCTHDN);
    console.log(maHDN);
    console.log(maNhaPhanPhoi);
    console.log(maNhanVien);
    console.log(kieuThanhToan);

    if (!maNhanVien || !maNhaPhanPhoi|| !ghichu|| !kieuThanhToan) {
      return alert("Thông tin nhập thiếu! Vui lòng kiểm tra lại");
    }

    var dataToSend = {
        maHoaDonNhap: maHDN,
        maNhaPhanPhoi: maNhaPhanPhoi,
        maTaiKhoan: maNhanVien,
        kieuThanhToan: kieuThanhToan,
        list_json_chitiethoadonnhap: []
    };

    // Lặp qua danh sách sản phẩm trong giỏ hàng và thêm vào list_json_chitiethoadonnhap
    for (var i = 0; i < $scope.cartItems.length; i++) {
        var item = $scope.cartItems[i];
        var maCTHDN = $scope.cartItems[i].maCTHDN;
        var chiTietHoaDonNhap = {
            maCTHDN: maCTHDN,
            maSanPham: item.maSanPham,
            soLuong: item.soLuong,
            donViTinh: donViTinh,
            giaNhap: $scope.giaNhap(item),
            tongTien: $scope.calculateTotalPriceForItem(item),
            ghiChu: ghichu
        };
        dataToSend.list_json_chitiethoadonnhap.push(chiTietHoaDonNhap);
      }

    $http({
        method: 'POST',
        data: dataToSend,
        url: current_url_ad + '/api/HoaDonNhap/update-hoadonnhap',
    }).then(function (response) {
        console.log(response.data);
        alert("Cập nhật hóa đơn nhập thành công!")
        localStorage.removeItem('cartAdmin');
        location.reload();
    });
  };
});

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maHDN = target.getAttribute('data-mahdn');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa hóa đơn nhập này?");

        if (xacNhan) {
            XoaHDN(maHDN);
        }
    }
});

function XoaHDN(maHDN) {
    fetch(current_url_ad + '/api/HoaDonNhap/delete/' + maHDN, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa hóa đơn nhập thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function NhapMoi() {
    localStorage.removeItem('cartAdmin');
    location.reload();
}
