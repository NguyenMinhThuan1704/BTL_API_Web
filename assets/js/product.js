document.addEventListener("DOMContentLoaded", function() {
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

