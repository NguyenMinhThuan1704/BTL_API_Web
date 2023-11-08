var app = angular.module('AppAdmin', []);
app.controller("TinTucController", function ($scope, $http) {

    $scope.listTT;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetTinTuc();
    };  

    $scope.GetTinTuc = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/TinTuc/search_tintuc'
        }).then(function (response) {
            $scope.listTT = response.data.data;
        });
    };
    $scope.GetTinTuc();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listTT;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetTinTuc();
        };
    
        $scope.GetTinTuc = function () {
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    tieu_de: $scope.tieudett,
                    mo_ta: $scope.motatt
                },
                url: current_url_ad + '/api/TinTuc/search_tintuc',
            }).then(function (response) {
                $scope.listTT = response.data.data;
            });
        };
        $scope.GetTinTuc();
    });
});



var list = JSON.parse(localStorage.getItem('Supplier')) || [];
function ThemTinTuc() {
    var TieuDe = document.getElementById("TieuDe").value;
    var AnhDaiDien = document.getElementById("AnhDaiDien").value;
    var MoTa = document.getElementById("MoTa").value;
    var NgayTao = document.getElementById("NgayTao").value;

    if (TieuDe == null || TieuDe == "") {
        alert("Tiêu đề tin tức không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (AnhDaiDien == null || AnhDaiDien == "") {
        alert("Ảnh đại diện không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (MoTa == null || MoTa == "") {
        alert("Mô tả không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.MaTinTuc == MaTinTuc) {
                alert("Mã tin tức đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var SupplierData = {
        TieuDe: TieuDe,
        AnhDaiDien: AnhDaiDien,
        MoTa: MoTa
    };
    // Gửi dữ liệu lên API
    fetch(current_url_ad + '/api/TinTuc/create-tintuc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(SupplierData) 
    })
    .then(response => {
        if (response.ok) {
            alert('Đã thêm thành công!');
            location.reload();
        } else {
            alert('Lỗi khi thêm tin tức!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}

function NhapMoi() {
    document.getElementById('TieuDe').value = '';
    document.getElementById('AnhDaiDien').value = '';
    document.getElementById('MoTa').value = '';
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maTT = target.getAttribute('data-matt');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa tin tức này?");

        if (xacNhan) {
            XoaTT(maTT);
        }
    }
});

function XoaTT(maTT) {
    fetch(current_url_ad + '/api/TinTuc/delete/' + maTT, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            // Xóa thành công
            alert('Xóa tin tức thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function SuaTT(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td');

    var MaTinTuc = cells[1].textContent;
    var TieuDe = cells[2].textContent;
    var AnhDaiDien = cells[3].textContent;
    var MoTa = cells[4].textContent; 
    var NgayTao = cells[5].textContent;

    document.getElementById("MaTinTuc").value = MaTinTuc;
    document.getElementById("TieuDe").value = TieuDe;
    document.getElementById("NgayTao").value = NgayTao;
    document.getElementById("AnhDaiDien").value = AnhDaiDien;
    document.getElementById("MoTa").value = MoTa;
    
    // Lưu mã khách hàng để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-matt", MaTinTuc);
}

function CapNhat() {

    var MaTinTuc = document.getElementById("btnUpdate").getAttribute("data-matt");

    var TieuDe = document.getElementById("TieuDe").value;
    var NgayTao = document.getElementById("NgayTao").value;
    var AnhDaiDien = document.getElementById("AnhDaiDien").value;
    var MoTa = document.getElementById("MoTa").value;

    var nhaPhanPhoiData = {
        MaTinTuc: MaTinTuc,
        TieuDe: TieuDe,
        NgayTao: NgayTao,
        AnhDaiDien: AnhDaiDien,
        MoTa: MoTa
    };

    // Tạo yêu cầu fetch để gửi dữ liệu cập nhật lên máy chủ
    fetch(current_url_ad + '/api/TinTuc/update-tintuc', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nhaPhanPhoiData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cập nhật thông tin nhà cung cấp thành công!');
            location.reload();
        } else {
            console.error('Lỗi cập nhật dữ liệu');
        }
    })
    .catch(error => {
        console.error('Lỗi kết nối đến máy chủ: ' + error);
    });
}

