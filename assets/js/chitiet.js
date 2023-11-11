var app = angular.module('AppBanHang', []);
app.controller("ChiTietCtrl", function ($scope, $http) {
    $scope.sp;  
    $scope.LoadSanPhambyID = function () { 
		var key = 'id';
		var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);		 
        $http({
            method: 'GET', 
            url: current_url + '/api/SanPham/get-by-id/'+value,
        }).then(function (response) { 
            $scope.sp = response.data;
            // $scope.maloaispa = response.data.maLoaiSanPham;
            // console.log($scope.maLoaiSanPham);
			// makeScript('js/main.js')
        });
    };  
    $scope.LoadSanPhambyID()

    $scope.splq;	 
    $scope.GetSanPhamLienQuan= function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 20, maloaisp: 2},
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {  
            $scope.splq = response.data.data;  
        });
    };   
	$scope.GetSanPhamLienQuan();
});