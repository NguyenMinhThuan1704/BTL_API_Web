var app = angular.module('AppBanHang', []);

app.controller("SearchCtrl", function ($scope, $http) {
    var key = 'ten_sp';
	var value = window.location.search.substring(window.location.search.indexOf(key)+key.length+1);	
    var decodedValue = decodeURIComponent(value);	

    var linkElement = document.querySelector('.search-title a');
    linkElement.textContent = decodedValue;
    linkElement.title = decodedValue;
    console.log(decodedValue);

    $scope.listItem = [];
    $scope.totalItems = 0;
    $scope.GetSearch = function () {
        $http({
            method: 'POST',
            data: { page: 1, pageSize: 100, ten_sp: decodedValue },
            url: current_url + '/api/SanPham/search',
        }).then(function (response) {  
            $scope.listItem = response.data.data; 
            $scope.totalItems = $scope.listItem.length; 
        });
    };
    $scope.GetSearch();
});