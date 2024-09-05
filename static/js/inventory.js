const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", function () {
  dropdownMenu.classList.toggle("show");
});

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

function addNewMedicine() {
  const medicineRow = document.createElement("div");
  medicineRow.classList.add("medicine-row");
  medicineRow.innerHTML = `
        <input type="text" class="form-control" placeholder="Name">
        <input type="number" class="form-control" placeholder="Item Code" value=""> <!-- Added -->
        <input type="number" class="form-control" placeholder="HSN/SAC Code" value="">
        <input type="number" class="form-control" placeholder="Purchase Price" value="">
        <input type="number" class="form-control" placeholder="MRP" value="">
        <input type="text" class="form-control" placeholder="Quantity" disabled>
        <button class="remove-btn" onclick="removeMedicine(this)">-</button>
    `;
  document.getElementById("medicine-list").appendChild(medicineRow);

  medicineRow.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", () => {
      calculateTotal(medicineRow);
      calculateGrandTotal();
    });
  });
}

function removeMedicine(button) {
  const row = button.closest(".medicine-row");
  row.remove();
  calculateGrandTotal();
}

function saveBill() {
  const billContainer = document.getElementById("bill-container");
  const billItems = document.getElementById("bill-items");
  billItems.innerHTML = "";

  const rows = document.querySelectorAll(".medicine-row");
  rows.forEach((row) => {
    const medicineName = row.querySelector(
      'input[placeholder="Medicine Name"]'
    ).value;
    const medName = row.querySelector('input[placeholder="Name"]').value;
    const code = row.querySelector('input[placeholder="Item Code"]').value;
    const hsncode = row.querySelector(
      'input[placeholder="HSN/SAC Code"]'
    ).value;
    const rate = row.querySelector('input[placeholder="Purchase Price"]').value;
    const mrp = row.querySelector('input[placeholder="MRP"]').value;
    const quantity = row.querySelector('input[placeholder="Quantity"]').value;

    const billRow = document.createElement("tr");
    billRow.innerHTML = `
            <td>${medName}</td>
            <td>${code}</td>
            <td>${hsnCode}</td>
            <td>${rate}</td>
            <td>${mrp}</td>
            <td>${quantity}</td>
        `;
    billItems.appendChild(billRow);
  });

  const grandTotal = document.getElementById("grand-total").innerText;
  document.getElementById("bill-grand-total").innerText = grandTotal;

  billContainer.style.display = "block";
}

// sending to flask the button data-----------------------------------------------------------------------------
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const row = this.closest("tr");
    const data = {
      itemCode: row.cells[1].innerText,
      itemName: row.cells[0].innerText,
      hsnSacCode: row.cells[2].innerText,
      purchasePrice: row.cells[3].innerText,
      MRP: row.cells[4].innerText,
      stock: row.cells[5].innerText,
    };

    fetch("/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
//---------------------------------------------------------------------------------------------------------------
function addItem() {
  const medicineRows = document.querySelectorAll(".medicine-row");
  const medicineData = [];
  console.log(medicineRows);

  medicineRows.forEach((row) => {
    console.log(
      "row lol " + row.querySelector('input[placeholder="Name"]').value
    );
    const itemName = row.querySelector('input[placeholder="Name"]').value;
    const quantity = row.querySelector('input[placeholder="Quantity"]').value;
    const rate = row.querySelector('input[placeholder="Purchase Price"]').value;
    const mrp = row.querySelector('input[placeholder="MRP"]').value;
    const hsnCode = row.querySelector(
      'input[placeholder="HSN/SAC Code"]'
    ).value;
    const itemCode = row.querySelector('input[placeholder="Item Code"]').value;

    // Create an object for each row
    medicineData.push({
      itemCode: parseInt(itemCode),
      itemName: itemName,
      hsnSacCode: parseInt(hsnCode),
      purchasePrice: parseInt(rate),
      MRP: parseInt(mrp),
      stock: parseInt(quantity),
    });
  });
  console.log("lol" + medicineData);

  // Send data to backend
  fetch("/add-item", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(medicineData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
