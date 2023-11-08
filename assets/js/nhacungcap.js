var app = angular.module('AppAdmin', []);
app.controller("NhaPhanPhoiController", function ($scope, $http) {

    $scope.listNPP;
    $scope.page = 1;
    $scope.changePage = function (pageNum) {
        $scope.page = pageNum;
        $scope.GetNhaPhanPhoi();
    };  

    $scope.GetNhaPhanPhoi = function () {
        $http({
            method: 'POST',
            data: { page: $scope.page, pageSize: 10 },
            url: current_url_ad + '/api/NhaPhanPhoi/search'
        }).then(function (response) {
            $scope.listNPP = response.data.data;
        });
    };
    $scope.GetNhaPhanPhoi();

    document.getElementById('btnSearch').addEventListener('click', function() {
        $scope.listNPP;
        $scope.page = 1;
        $scope.changePage = function (pageNum) {
            $scope.page = pageNum;
            $scope.GetNhaPhanPhoi();
        }; 
    
        $scope.GetNhaPhanPhoi = function () {
            $http({
                method: 'POST',
                data: {
                    page: $scope.page,
                    pageSize: 10,
                    ten_npp: $scope.tenncc,
                    dia_chi: $scope.diachincc
                },
                url: current_url_ad + '/api/NhaPhanPhoi/search',
            }).then(function (response) {
                $scope.listNPP = response.data.data;
            });
        };
        $scope.GetNhaPhanPhoi();
    });
});



var list = JSON.parse(localStorage.getItem('Supplier')) || [];
function ThemNhaPhanPhoi() {
    var TenNhaPhanPhoi = document.getElementById("TenNhaPhanPhoi").value;
    var SoDienThoai = document.getElementById("SoDienThoai").value;
    var MoTa = document.getElementById("MoTa").value;
    var DiaChi = document.getElementById("DiaChi").value;
    var number = /^[0-9]+$/;

    if (TenNhaPhanPhoi == null || TenNhaPhanPhoi == "") {
        alert("Tên nhà cung cấp không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (SoDienThoai == null || SoDienThoai == "") {
        alert("Số điện thoại nhà cung cấp không được để trống! Vui lòng nhập lại!");
        return false;
    } else if (!SoDienThoai.match(number) || SoDienThoai.length != 10) {
        alert("Số điện thoại nhà cung cấp phải là kiểu số và có độ dài là 10 ký tự! Vui lòng nhập lại!");
        return false;
    }
    else if (DiaChi == null || DiaChi == "") {
        alert("Địa chỉ nhà cung cấp không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else if (MoTa == null || MoTa == "") {
        alert("Mô tả không được để trống! Vui lòng nhập lại!");
        return false;
    }
    else {
        for (var x of list) {
            if (x.MaNhaPhanPhoi == MaNhaPhanPhoi) {
                alert("Mã nhà cung cấp đã tồn tại! Vui lòng nhập lại!")
                return false;
            }
        }
    }
    var SupplierData = {
        TenNhaPhanPhoi: TenNhaPhanPhoi,
        DiaChi: DiaChi,
        SoDienThoai: SoDienThoai,
        MoTa: MoTa
    };

    fetch(current_url_ad + '/api/NhaPhanPhoi/create-nha-phan-phoi', {
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
            alert('Lỗi khi thêm nhà cung cấp!');
        }
    })
    .catch(error => {
        alert('Lỗi kết nối tới API: ' + error);
    });
}

function NhapMoi() {
    document.getElementById('TenNhaPhanPhoi').value = '';
    document.getElementById('SoDienThoai').value = '';
    document.getElementById('MoTa').value = '';
    document.getElementById('DiaChi').value = '';
}

document.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('fa-trash-alt')) {

        var maNPP = target.getAttribute('data-manpp');

        var xacNhan = confirm("Bạn có chắc chắn muốn xóa nhà cung cấp này?");

        if (xacNhan) {
            XoaNCC(maNPP);
        }
    }
});

function XoaNCC(maNPP) {
    fetch(current_url_ad + '/api/NhaPhanPhoi/delete/' + maNPP, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (response.ok) {
            alert('Xóa nhà phân phối thành công!');
            location.reload();
        } else {
            // Xử lý lỗi nếu cần
        }
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
}

function SuaNPP(icon) {
    var row = icon.parentNode.parentNode;
    var cells = row.getElementsByTagName('td'); 

    var MaNhaPhanPhoi = cells[1].textContent;
    var TenNhaPhanPhoi = cells[2].textContent;
    var DiaChi = cells[3].textContent;
    var SoDienThoai = cells[4].textContent;
    var MoTa = cells[5].textContent; 

    document.getElementById("MaNhaPhanPhoi").value = MaNhaPhanPhoi;
    document.getElementById("TenNhaPhanPhoi").value = TenNhaPhanPhoi;
    document.getElementById("DiaChi").value = DiaChi;
    document.getElementById("SoDienThoai").value = SoDienThoai;
    document.getElementById("MoTa").value = MoTa;
    
    // Lưu mã khách hàng để sử dụng khi cập nhật
    document.getElementById("btnUpdate").setAttribute("data-manpp", MaNhaPhanPhoi);
}

function CapNhat() {

    var MaNhaPhanPhoi = document.getElementById("btnUpdate").getAttribute("data-manpp");

    var TenNhaPhanPhoi = document.getElementById("TenNhaPhanPhoi").value;
    var DiaChi = document.getElementById("DiaChi").value;
    var SoDienThoai = document.getElementById("SoDienThoai").value;
    var MoTa = document.getElementById("MoTa").value;

    var nhaPhanPhoiData = {
        MaNhaPhanPhoi: MaNhaPhanPhoi,
        TenNhaPhanPhoi: TenNhaPhanPhoi,
        DiaChi: DiaChi,
        SoDienThoai: SoDienThoai,
        MoTa: MoTa
    };

    fetch(current_url_ad + '/api/NhaPhanPhoi/update-nha-phan-phoi', {
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

