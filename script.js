
console.log('JavaScript code is running');

const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function() {
  dropDownMenu.classList.toggle('open');
  const isOpen = dropDownMenu.classList.contains('open');

  toggleBtnIcon.classList = isOpen
    ? 'fa-solid fa-xmark'
    : 'fa-solid fa-bars';
};


let list = document.querySelectorAll(".list li");
let box = document.querySelectorAll(".box");
let selectedCategory = localStorage.getItem("selectedCategory");

// Function to filter and display the boxes based on the selected category
function filterBoxes(category) {
  box.forEach((el) => {
    el.style.display = "none";
  });

  document.querySelectorAll(category).forEach((el) => {
    el.style.display = "flex";
  });
}

// Event listener for list items
list.forEach((el) => {
  el.addEventListener("click", (e) => {
    list.forEach((el1) => {
      el1.style.color = "#513252";
    });
    e.target.style.color = "#9BABB8";

    let category = e.target.dataset.color;
    filterBoxes(category);

    // Store the selected category in localStorage
    localStorage.setItem("selectedCategory", category);
  });
});

// Restore the selected category on page reload
if (selectedCategory) {
  list.forEach((el) => {
    if (el.dataset.color === selectedCategory) {
      el.style.color = "#d4a373";
      filterBoxes(selectedCategory);
    }
  });
}

// swipe untuk review
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

//add to cart function
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () =>{
  cart.classList.add('active');
};
closeCart.onclick = () =>{
  cart.classList.remove('active');
};

//cart working JS
if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded',ready);
}else{
  ready();
}

//making function 
function ready(){
  //remove items from cart
  var removeCartButtons = document.getElementsByClassName('cart-remove');
  console.log(removeCartButtons)
  for(var i = 0; i < removeCartButtons.length; i++){
    var button = removeCartButtons[i];
    button.addEventListener("click", removeCartItem);
  }
  //quantity changes
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for(var i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change",quantityChanged);
  }
  //Add to cart
  var addCart = document.getElementsByClassName('order')
  for(var i = 0; i < addCart.length; i++){
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  //Buy Button Work
  document
  .getElementsByClassName('btn-buy')[0]
  .addEventListener('click', buyButtonClicked);

}
// buy button
function buyButtonClicked(){
  alert('Your Order is placed')
  var cartContent = document.getElementsByClassName('cart-content')[0]
  while (cartContent.hasChildNodes()){
    // ChildNode comment tag was missing in the original code
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
}
// for anchor href smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
     });
  });
});

function removeCartItem(event){
  var buttonClicked = event.target
  buttonClicked.parentElement.remove();
  updatetotal();
}
//Quantity changes
function quantityChanged(event){
  var input = event.target
  if (isNaN([input.value]) || input.value <= 0){
    input.value = 1
  }
  updatetotal();
}
//Add to cart
function addCartClicked(event){
  var button = event.target;
  var shopProducts = button.closest('.box');
  var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
  var price = shopProducts.getElementsByClassName('price')[0].innerText;
  var productImage = shopProducts.getElementsByClassName("product-image")[0].src;
  addProductToCart(title,price,productImage);
  updatetotal();
}

function addProductToCart(title, price, productImage) {
  var cartItems = document.getElementsByClassName('cart-content')[0];
  var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  for (var i = 0; i < cartItemsNames.length; i++) {
    var cartItemTitle = cartItemsNames[i].innerText;
    if (cartItemTitle === title) {
      alert("You already added this item to the cart.");
      return;
    }
  }

  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add('cart-box');

  var cartBoxContent = `
    <img src="${productImage}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <!--Remove Cart-->
    <i class="ri-delete-bin-line cart-remove"></i>
  `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}



//update total
function updatetotal(){
  var cartContent = document.getElementsByClassName('cart-content')[0];
  var cartBoxes = cartContent.getElementsByClassName('cart-box');
  var total = 0;
  for(var i = 0; i < cartBoxes.length; i++){
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName('cart-price')[0];
    var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    var price = parseFloat(priceElement.innerText.replace("RM",""));
    var quantity = quantityElement.value;
    total = total + (price * quantity);
  }
    //if price contain some cents value
    total = Math.round(total * 100)/100;
    document.getElementsByClassName('total-price')[0].innerText = "RM" + total
}

//link to payment
  // Get a reference to the button element
  var button = document.querySelector('.btn-buy');

  // Add an event listener to the button
  button.addEventListener('click', function() {
    // Change the location of the current page
    window.location.href = 'payment.html';
  });


