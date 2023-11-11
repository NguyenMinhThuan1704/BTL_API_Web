document.addEventListener('DOMContentLoaded', function() {
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

    var toggleIcons = document.querySelectorAll('.icon_eye');

    toggleIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            var passwordInput = icon.parentElement.querySelector('.matkhau_pass');
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    });

    // const loginButton = document.getElementById("loginButton");

    // loginButton.addEventListener("click", function () {
    //     const username = document.getElementById("username").value;
    //     const password = document.getElementById("password").value;

    //     fetch(current_url_ad + "/api/User/Select-all-taikhoan", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //         }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data === 3) {
    //             window.location.href = "index_main.html";
    //         } else if (data === 2) {
    //             window.location.href = "khuyenmai.html";
    //         } else {
    //             document.getElementById("result").textContent = "Tài khoản hoặc mật khẩu không đúng.";
    //         }
    //     })
    //     .catch(error => {
    //         document.getElementById("result").textContent = "Có lỗi xảy ra trong quá trình đăng nhập.";
    //     });
    // });
    
});

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