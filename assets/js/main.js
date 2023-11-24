


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