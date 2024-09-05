/* Open the side panel */
function openPanel() {
  var panel = document.getElementById("mySidePanel");
  if (panel) {
    panel.style.width = "250px";
  } else {
    console.error("Element with id 'mySidePanel' not found.");
  }
}

/* Close the side panel */
function closePanel() {
  var panel = document.getElementById("mySidePanel");
  if (panel) {
    panel.style.width = "0";
  } else {
    console.error("Element with id 'mySidePanel' not found.");
  }
}

function calculateTotal() {
  const quantity = parseFloat(document.getElementById("quantity").value);
  const price = parseFloat(document.getElementById("price").value);
  const discount = parseFloat(document.getElementById("discount").value);

  if (!isNaN(quantity) && !isNaN(price) && !isNaN(discount)) {
    const discountedAmount = (price * discount) / 100;
    const total = (price - discountedAmount) * quantity;

    document.getElementById("discountedAmount").value =
      discountedAmount.toFixed(2);
    document.getElementById("total").value = total.toFixed(2);
  } else {
  }
}

function increment(element) {
  let quantityInput = element.parentNode.querySelector(".quantity-input");
  let currentQuantity = parseInt(quantityInput.value);
  quantityInput.value = currentQuantity + 1;
}

// Decrement function
function decrement(element) {
  let quantityInput = element.parentNode.querySelector(".quantity-input");
  let currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
    quantityInput.value = currentQuantity - 1;
  }
}

// Function to load items from localStorage and display them as cards
function loadCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length > 0) {
    document.getElementById("item-card-container").innerHTML = ""; // Clear container

    cartItems.forEach((item, index) => {
      const itemCard = `
                      <div class="item-card" data-index="${index}">
                        <div class="item-name">${item.name}</div>
                        <div class="item-code">Item Code: ${item.code}</div>
                        <div class="item-hsncode">HSN/SAC Code: ${
                          item.hsncode
                        }</div>
                        <div class="item-price">Price: ${item.price}</div>
                        <div class="quantity-container">
                            <button class="decrease-btn">-</button>
                            <input type="number" value="${
                              item.quantity || 1
                            }" min="1" class="quantity-input">
                            <button class="increase-btn">+</button>
                        </div>
                        <button class="remove-btn">Remove</button>
                    </div>
                `;
      document.getElementById("item-card-container").innerHTML += itemCard;
    });

    attachEventListeners();
  } else {
    document.getElementById("item-card-container").innerHTML =
      "<p>No items in cart.</p>";
  }
}

// Function to attach event listeners to buttons
function attachEventListeners() {
  // Attach event listeners for remove buttons
  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const itemCard = this.parentElement;
      const itemIndex = itemCard.getAttribute("data-index");
      removeCartItem(itemIndex);
    });
  });

  // Attach event listeners for quantity buttons
  document.querySelectorAll(".decrease-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.nextElementSibling;
      if (input.value > 1) {
        input.value--;
        updateCartItemQuantity(
          this.parentElement.parentElement.getAttribute("data-index"),
          input.value
        );
      }
    });
  });

  document.querySelectorAll(".increase-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.previousElementSibling;
      input.value++;
      updateCartItemQuantity(
        this.parentElement.parentElement.getAttribute("data-index"),
        input.value
      );
    });
  });

  // Attach event listener for quantity input change
  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", function () {
      if (input.value < 1) input.value = 1;
      updateCartItemQuantity(
        this.parentElement.parentElement.getAttribute("data-index"),
        input.value
      );
    });
  });
}

// Function to update the quantity of an item in the cart
function updateCartItemQuantity(index, newQuantity) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems[index].quantity = newQuantity;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

// Function to remove an item from the cart
function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItems(); // Reload the cart items to reflect the changes
}

// Load cart items on page load
window.onload = loadCartItems;

function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const removedItem = cartItems[index].name;

  // Remove the item from the cart
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Re-enable the "Add to Cart" button in the source page
  window.opener.document
    .querySelectorAll(".add-to-cart-btn")
    .forEach((button) => {
      const itemRow = button.closest("tr");
      const itemName = itemRow.querySelector(".item-name").textContent;

      if (itemName === removedItem) {
        button.disabled = false;
        button.textContent = "Add to Cart";
      }
    });

  // Reload the cart items to reflect the changes
  loadCartItems();
}
// ----------------------------------------------------------------------------------
function removeCartItem(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const removedItem = cartItems[index].name;

  // Remove the item from the cart
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Re-enable the "Add to Cart" button in the source page
  window.opener.document
    .querySelectorAll(".add-to-cart-btn")
    .forEach((button) => {
      const itemRow = button.closest("tr");
      const itemName = itemRow.querySelector(".item-name").textContent;

      if (itemName === removedItem) {
        button.disabled = false;
        button.textContent = "Add to Cart";
      }
    });

  // Reload the cart items to reflect the changes
  loadCartItems();
}
