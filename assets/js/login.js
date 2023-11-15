var app = angular.module('AppBanHang', []);
app.controller('LoginCtrl', function ($scope, $http) {
    $scope.userName = '';
    $scope.password = '';
    $scope.dataUser;
    $scope.login = function () {
        var data = {
          username: $scope.userName,
          password: $scope.password,
        };
        $http({
            method: 'POST',
            url: 'https://localhost:44306/api/User/login',
            data: JSON.stringify(data),
        })
            .then(function (response) {
                console.log(response);
                $scope.dataUser = response.data;

                switch ($scope.dataUser.loaitaikhoan) {
                    case 1:
                      if ($scope.dataUser.mataikhoan) {
                          window.location.href = `/admin/TongQuan.html?id=${$scope.dataUser.mataikhoan}`;
                          // window.location.href = "/admin/TongQuan.html";
                      } else {
                          console.log('Không có ID để chuyển hướng.');
                      }
                      break;
                    case 2:
                      if($scope.dataUser.mataikhoan){
                          window.location.href = `/admin/TongQuanNV.html?id=${$scope.dataUser.mataikhoan}`;
                          // window.location.href = "/admin/TongQuanNV.html";
                      }
                      else {
                          console.log("khong co id");
                      }
                      break;
                    case 3:
                      if($scope.dataUser.mataikhoan){
                          window.location.href = `/index_main.html?id=${$scope.dataUser.mataikhoan}`;
                          // window.location.href = "/index_main.html";
                      }
                      else {
                          console.log("khong co id");
                      }
                      break;
                    default:
                        console.log($scope.dataUser.loaitaikhoan);
                }
            })
        
    };
});