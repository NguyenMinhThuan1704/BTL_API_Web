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

  var inputElement = document.querySelector('.pass');
  var placeholders = ["Bạn muốn tìm gì ...", "Đèn trang trí nội thất", "Đèn trang trí ngoại thất"];
  var currentIndex = 0;
  var animationTimeout;

  function typePlaceholder() {
    var placeholderText = placeholders[currentIndex];
    inputElement.setAttribute("placeholder", ""); // Xóa nội dung placeholder

    var length = placeholderText.length;
    var currentLength = 0;

    animationTimeout = setInterval(function() {
      if (currentLength <= length) {
        inputElement.setAttribute("placeholder", placeholderText.substring(0, currentLength));
        currentLength++;
      } else {
        clearInterval(animationTimeout);
        setTimeout(deletePlaceholder, 1000); // Sau khi hiển thị, đợi 1 giây trước khi xóa
      }
    }, 30); // Tốc độ viết
    currentIndex = (currentIndex + 1) % placeholders.length; // Đặt lại currentIndex khi nó đạt cuối mảng
  }

  function deletePlaceholder() {
    var placeholderText = inputElement.getAttribute("placeholder");
    var length = placeholderText.length;
    var currentLength = length;

    animationTimeout = setInterval(function() {
      if (currentLength >= 0) {
        inputElement.setAttribute("placeholder", placeholderText.substring(0, currentLength));
        currentLength--;
      } else {
        clearInterval(animationTimeout);
        setTimeout(typePlaceholder, 500); // Sau khi xóa, đợi 0.5 giây trước khi hiển thị tiếp
      }
    }, 20); // Tốc độ xóa

    currentIndex = (currentIndex + 1) % placeholders.length; // Đặt lại currentIndex khi nó đạt cuối mảng
  }
  // Gọi hàm typePlaceholder để bắt đầu hiển thị placeholder đầu tiên
  typePlaceholder();

  // Lấy số lượng ban đầu từ trường nhập liệu
  var quantity = parseInt(document.querySelector(".product-quantity input.qty").value);
  var selectProduct = document.querySelector(".product-quantity input.qty");
  var tang =  document.querySelector(".quantity_up");
  var giam =  document.querySelector(".quantity_down");

  // Xử lý sự kiện khi nhấn nút giảm
  giam.addEventListener("click", function () {
    if (quantity > 0) {
      quantity -= 1;
    } else {
      quantity = 0;
    }
    selectProduct.value = quantity;
  });

  // Xử lý sự kiện khi nhấn nút tăng
  tang.addEventListener("click", function () {
    if (quantity < 100) {
      quantity += 1;
    } else {
      quantity = 100;
    }
    selectProduct.value = quantity;
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
  $scope.confirmDelete = function (item) {
    var confirmation = confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?");
    if (confirmation) {
        $scope.removeFromCart($scope.cartItems.indexOf(item));
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
    if (typeof(Storage) !== "undefined") {
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

