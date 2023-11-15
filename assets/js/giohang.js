document.addEventListener("DOMContentLoaded", function() {
  // chọn 1 trong 2 input
  const cashPayment = document.getElementById("cashPayment");
  const onlinePayment = document.getElementById("onlinePayment");

  cashPayment.addEventListener("change", function () {
    onlinePayment.checked = !cashPayment.checked;
  });

  onlinePayment.addEventListener("change", function () {
    cashPayment.checked = !onlinePayment.checked;
  });
});

var app = angular.module('AppBanHang', []);
app.controller("CartCtrl", function ($scope, $http) {
  $scope.getCartItems = function () {
      if (typeof(Storage) !== "undefined") {
          var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
          $scope.cartItems = cartItems;
      } else {
          console.error('Local storage không được hỗ trợ');
      }
  };
  $scope.getCartItems();

    // Hàm tăng số lượng sản phẩm
    $scope.incrementQuantity = function (item) {
    item.quantity++;
    $scope.saveCart();
  };

  // Hàm giảm số lượng sản phẩm
  $scope.decrementQuantity = function (item) {
      if (item.quantity > 1) {
          item.quantity--;
          $scope.saveCart();
      }
  };

  // Hàm lưu thay đổi vào local storage
  $scope.saveCart = function () {
      if (typeof(Storage) !== "undefined") {
          localStorage.setItem('cart', JSON.stringify($scope.cartItems));
      }
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  $scope.removeFromCart = function (index) {
    $scope.cartItems.splice(index, 1);
    $scope.saveCart();
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  $scope.confirmDelete = function (item) {
    var confirmation = confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (confirmation) {
        $scope.removeFromCart($scope.cartItems.indexOf(item));
        console.log($scope.cartItems.indexOf(item));
    }
  };

  // Hàm tính tổng giá của một sản phẩm
  $scope.calculateTotalPriceForItem = function (item) {
    return item.giaGiam * item.quantity;
  };

  // Hàm tính tổng giá trị đơn hàng
  $scope.calculateTotalPrice = function () {
    var totalPrice = 0;

    // Lặp qua danh sách sản phẩm trong giỏ hàng và tính tổng giá trị
    for (var i = 0; i < $scope.cartItems.length; i++) {
        totalPrice += $scope.cartItems[i].giaGiam * $scope.cartItems[i].quantity;
    }

    return totalPrice;
  };
  console.log($scope.cartItems);

  // Hàm xóa hết dữ liệu trong giỏ hàng
  $scope.clearCart = function () {
    var confirmation = confirm("Bạn có chắc muốn xóa toàn bộ sản phẩm khỏi giỏ hàng?");
    if (confirmation) {
        localStorage.removeItem('cart');
        $scope.cartItems = [];
    } else {
        console.error('Local storage không được hỗ trợ');
    }
  };

   // Hàm chuẩn bị dữ liệu và gọi API để thêm vào CSDL
   $scope.addHoaDonCSDL = function () {

    if (!$scope.hoTen || !$scope.soDienThoai || !$scope.diaChi) {
      return alert("Thông tin khách hàng nhập thiếu");
    }

    // Tạo dữ liệu cần gửi qua API
    var dataToSend = {
        tenKH: $scope.hoTen,
        diaChi: $scope.diaChi,
        sdt: $scope.soDienThoai,
        trangThai: true,
        list_json_chitiethoadon: []
    };

    // Lặp qua danh sách sản phẩm trong giỏ hàng và thêm vào list_json_chitiethoadon
    for (var i = 0; i < $scope.cartItems.length; i++) {
        var item = $scope.cartItems[i];
        var chiTietHoaDon = {
            maSanPham: item.maSanPham,
            soLuong: item.quantity,
            tongGia: $scope.calculateTotalPriceForItem(item),
            ghiChu: 1
        };
        dataToSend.list_json_chitiethoadon.push(chiTietHoaDon);
      }

    $http({
        method: 'POST',
        data: dataToSend,
        url: current_url_ad + '/api/HoaDon/create-hoadon',
    }).then(function (response) {
        // Xử lý kết quả từ API nếu cần
        console.log(response.data);
        alert("Mua hàng thành công!")
        localStorage.removeItem('cart');
        location.reload();
    });
  };
});

