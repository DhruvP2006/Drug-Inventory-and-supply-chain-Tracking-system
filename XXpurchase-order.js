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
    alert("Please enter valid numbers for quantity, price, and discount.");
  }
}
