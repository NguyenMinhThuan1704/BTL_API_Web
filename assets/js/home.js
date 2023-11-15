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

            alert('Đã thêm sản phẩm vào giỏ hàng!');
        } else {
            console.error('Local storage không được hỗ trợ');
        }
    };

    // -------------TRANG CHỦ---------------
    $scope.searchKeyword = "";

    $scope.search = function () {
        window.location.href = 'search.html?ten_sp=' + $scope.searchKeyword;
    };
    
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