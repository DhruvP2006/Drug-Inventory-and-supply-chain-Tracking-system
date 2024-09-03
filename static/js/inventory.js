/* Open the side panel */
function openPanel() {
  document.getElementById("mySidePanel").style.width = "250px";
}

/* Close the side panel */
function closePanel() {
  document.getElementById("mySidePanel").style.width = "0";
}

const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.parentElement.parentElement;

    const itemNameElement = row.querySelector(".item-name");
    const itemCodeElement = row.querySelector(".item-code");
    const itemhsnCodeElement = row.querySelector(".hsn-code");
    const itempriceElement = row.querySelector(".purchase-price");

    if (
      !itemNameElement ||
      !itemCodeElement ||
      !itemhsnCodeElement ||
      !itempriceElement
    ) {
      alert(
        "One or more elements not found in the row. Please check your HTML structure."
      );
      return;
    }

    const itemName = itemNameElement.textContent;
    const itemCode = itemCodeElement.textContent;
    const itemHsnCode = itemhsnCodeElement.textContent;
    const itemprice = itempriceElement.textContent;

    const item = {
      name: itemName,
      code: itemCode,
      hsncode: itemHsnCode,
      price: itemprice,
    };

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // alert("Item added to cart!");
  });
});

// sending to flask the button data
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const row = this.closest('tr');
    const data = {
      itemCode: row.cells[1].innerText,
      itemName: row.cells[0].innerText,
      hsnSacCode: row.cells[2].innerText,
      purchasePrice: row.cells[3].innerText,
      MRP: row.cells[4].innerText,
      stock: row.cells[5].innerText
    };

    fetch('/add-item', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});