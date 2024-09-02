// Calculate total for the current row
function calculateTotal(row) {
    const rate = parseFloat(row.querySelector('input[placeholder="Rate"]').value) || 0;
    const discount = parseFloat(row.querySelector('input[placeholder="Discount %"]').value) || 0;
    const discountedAmount = rate - (rate * discount / 100);
    const totalField = row.querySelector('.total');
    totalField.value = discountedAmount.toFixed(2);
}

// Recalculate grand total
function calculateGrandTotal() {
    const totalFields = document.querySelectorAll('.total');
    let grandTotal = 0;
    totalFields.forEach(field => {
        grandTotal += parseFloat(field.value) || 0;
    });
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
}

// Add new medicine row
function addNewMedicine() {
    const medicineRow = document.createElement('div');
    medicineRow.classList.add('medicine-row');
    medicineRow.innerHTML = `
        <input type="text" class="form-control" placeholder="Medicine Name">
        <input type="number" class="form-control" placeholder="Rate" value="0">
        <input type="number" class="form-control" placeholder="MRP" value="0">
        <input type="text" class="form-control" placeholder="HSN Code">
        <input type="number" class="form-control" placeholder="Discount %" value="0">
        <input type="number" class="form-control total" placeholder="Total" disabled>
        <button class="remove-btn" onclick="removeMedicine(this)">-</button>
    `;
    document.getElementById('medicine-list').appendChild(medicineRow);

    // Add event listeners for real-time calculation
    const discountField = medicineRow.querySelector('input[placeholder="Discount %"]');
    discountField.addEventListener('input', () => {
        calculateTotal(medicineRow);
        calculateGrandTotal();
    });

    const rateField = medicineRow.querySelector('input[placeholder="Rate"]');
    rateField.addEventListener('input', () => {
        calculateTotal(medicineRow);
        calculateGrandTotal();
    });
}

// Remove a medicine row
function removeMedicine(button) {
    const row = button.closest('.medicine-row');
    row.remove();
    calculateGrandTotal();
}

// Save the bill and generate bill interface
function saveBill() {
    const billContainer = document.getElementById('bill-container');
    const billItems = document.getElementById('bill-items');
    billItems.innerHTML = ''; // Clear previous bill items

    const rows = document.querySelectorAll('.medicine-row');
    rows.forEach(row => {
        const medicineName = row.querySelector('input[placeholder="Medicine Name"]').value;
        const rate = row.querySelector('input[placeholder="Rate"]').value;
        const mrp = row.querySelector('input[placeholder="MRP"]').value;
        const hsnCode = row.querySelector('input[placeholder="HSN Code"]').value;
        const discount = row.querySelector('input[placeholder="Discount %"]').value;
        const total = row.querySelector('.total').value;

        const billRow = document.createElement('tr');
        billRow.innerHTML = `
            <td>${medicineName}</td>
            <td>${rate}</td>
            <td>${mrp}</td>
            <td>${hsnCode}</td>
            <td>${discount}</td>
            <td>${total}</td>
        `;
        billItems.appendChild(billRow);
    });

    const grandTotal = document.getElementById('grand-total').innerText;
    document.getElementById('bill-grand-total').innerText = grandTotal;

    billContainer.style.display = 'block';
}

// Download the bill as PDF

// Download the bill as PDF
function downloadBill() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Bill Summary', 14, 20);

    // Buyer Details
    const buyerName = document.getElementById('buyer-name').value || 'N/A';
    const buyerAddress = document.getElementById('buyer-address').value || 'N/A';
    const buyerContact = document.getElementById('buyer-contact').value || 'N/A';
    const buyerGSTIN = document.getElementById('buyer-gstin').value || 'N/A';

    doc.setFontSize(10);
    doc.text(`Name: ${buyerName}`, 150, 20);
    doc.text(`Address: ${buyerAddress}`, 150, 30);
    doc.text(`Contact: ${buyerContact}`, 150, 40);
    doc.text(`GSTIN: ${buyerGSTIN}`, 150, 50);

    // Bill Table
    const table = document.querySelector('.bill-table');
    doc.autoTable({ 
        html: table, 
        startY: 60,
        styles: {
            fontSize: 10,
            cellPadding: 2,
            halign: 'center',
        },
        headStyles: {
            fillColor: [0, 0, 0],
            textColor: [255, 255, 255],
        },
        theme: 'striped'
    });

    // Grand Total
    const grandTotal = document.getElementById('bill-grand-total').innerText;
    doc.text(`Grand Total: ${grandTotal} ₹`, 14, doc.lastAutoTable.finalY + 10);

    // Save PDF
    doc.save('bill-summary.pdf');
}

// Initial calculation for existing rows
document.querySelectorAll('.medicine-row').forEach(row => {
    row.querySelector('input[placeholder="Discount %"]').addEventListener('input', () => {
        calculateTotal(row);
        calculateGrandTotal();
    });
    row.querySelector('input[placeholder="Rate"]').addEventListener('input', () => {
        calculateTotal(row);
        calculateGrandTotal();
    });
});