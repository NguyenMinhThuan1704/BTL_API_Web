var app = angular.module('AppBanHang', []);
app.controller("HomeCtrl", function ($scope, $http) {

    // Hàm để thêm sản phẩm vào giỏ hàng
    $scope.addToCart = function (product) {
        // Kiểm tra xem local storage có được hỗ trợ không
        if (typeof(Storage) !== "undefined") {
            // Lấy các sản phẩm trong giỏ hàng từ local storage hoặc khởi tạo một mảng rỗng nếu chưa có
            var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            var existingProduct = cartItems.find(item => item.maSanPham === product.maSanPham);

            if (existingProduct) {
                // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng hoặc thông tin liên quan khác
                existingProduct.quantity += 1;
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm nó vào giỏ hàng
                cartItems.push({
                    maSanPham: product.maSanPham,
                    tenSanPham: product.tenSanPham,
                    anhDaiDien: product.anhDaiDien,
                    giaGiam: product.giaGiam,
                    gia: product.gia,
                    quantity: 1 
                });
            }

            // Lưu các sản phẩm trong giỏ hàng đã cập nhật trở lại local storage
            localStorage.setItem('cart', JSON.stringify(cartItems));

            // alert('Đã thêm sản phẩm vào giỏ hàng!');
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };

    // -------------TRANG CHỦ---------------
    $scope.listItem;
    $scope.GetDenChum = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 8, maloaisp: 2},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {  
            $scope.listItem = response.data.data;  

        });
    };   
	$scope.GetDenChum();

    $scope.listDenMam;
    $scope.GetDenMam = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 8, maloaisp: 3},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {  
            $scope.listDenMam = response.data.data;  

        });
    };   
	$scope.GetDenMam();

    $scope.sanphammoinhat;
    $scope.GetMoiNhat= function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/Select-sanphamtheochucnang/4',
        }).then(function (response) {  
            $scope.sanphammoinhat = response.data;  

        });
    };   
	$scope.GetMoiNhat();

    $scope.banchaynhat;
    $scope.GetBanChayNhat = function () {
        $http({
            method: 'GET',
            url: current_url + '/api/SanPham/Select-sanphamtheochucnang/1',
        }).then(function (response) {  
            $scope.banchaynhat = response.data;  

        });
    };   
	$scope.GetBanChayNhat();
    
    $scope.tk;  
    $scope.LoadTaiKhoan = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/User/get-by-id/'+value,
        }).then(function (response) { 
            $scope.tk = response.data;
        });
    };  
    $scope.LoadTaiKhoan()
});

document.addEventListener("DOMContentLoaded", function() {
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
});