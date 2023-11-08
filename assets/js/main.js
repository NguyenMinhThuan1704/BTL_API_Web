// var inputElement = document.querySelector('pass');

// var placeholderValues = [
//   'Bạn cần tìm gì...',
//   'Đèn trang trí nội thất',
//   'Đèn trang trí ngoại thất',
// ];

// var currentIndex = 1;

// // Hàm để thay đổi giá trị placeholder và cập nhật chỉ số
// function changePlaceholder() {
//   inputElement.placeholder = placeholderValues[currentIndex];
//   currentIndex = (currentIndex + 1) % placeholderValues.length;
// }
// setInterval(changePlaceholder, 4000);


//-------------------slider-new-product----------------
const rightbtn = document.querySelector('.btn-right')
const leftbtn = document.querySelector('.fa-angle-left')
const newproductlength = document.querySelector('.new__product-item').offsetWidth
const sildeWrapper = document.querySelector('.new__product-item-wrapper')

rightbtn.addEventListener("click", function(){
    sildeWrapper.scrollLeft += newproductlength
})

leftbtn.addEventListener("click", function(){
    sildeWrapper.scrollLeft -= newproductlength
})