
function calculateTotal(row) {
    const quantity = parseFloat(row.querySelector('input[placeholder="Quantity"]').value) || 0;
    const rate = parseFloat(row.querySelector('input[placeholder="Rate"]').value) || 0;
    const discount = parseFloat(row.querySelector('input[placeholder="Discount %"]').value) || 0;
    const discountedAmount = (rate * quantity) - (rate * quantity * discount / 100);
    const totalField = row.querySelector('.total');
    totalField.value = discountedAmount.toFixed(2);
}


function calculateGrandTotal() {
    const totalFields = document.querySelectorAll('.total');
    let grandTotal = 0;
    totalFields.forEach(field => {
        grandTotal += parseFloat(field.value) || 0;
    });
    document.getElementById('grand-total').innerText = grandTotal.toFixed(2);
}

// Add new row
function addNewMedicine() {
    const medicineRow = document.createElement('div');
    medicineRow.classList.add('medicine-row');
    medicineRow.innerHTML = `
        <input type="text" class="form-control" placeholder="Medicine Name">
        <input type="number" class="form-control" placeholder="Quantity" value="1"> <!-- Added -->
        <input type="number" class="form-control" placeholder="Rate" value="0">
        <input type="number" class="form-control" placeholder="MRP" value="0">
        <input type="text" class="form-control" placeholder="HSN Code">
        <input type="number" class="form-control" placeholder="Discount %" value="0">
        <input type="number" class="form-control total" placeholder="Total" disabled>
        <button class="remove-btn" onclick="removeMedicine(this)">-</button>
    `;
    document.getElementById('medicine-list').appendChild(medicineRow);

    
    medicineRow.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            calculateTotal(medicineRow);
            calculateGrandTotal();
        });
    });
}


function removeMedicine(button) {
    const row = button.closest('.medicine-row');
    row.remove();
    calculateGrandTotal();
}


function saveBill() {
    const billContainer = document.getElementById('bill-container');
    const billItems = document.getElementById('bill-items');
    billItems.innerHTML = ''; 

    const rows = document.querySelectorAll('.medicine-row');
    rows.forEach(row => {
        const medicineName = row.querySelector('input[placeholder="Medicine Name"]').value;
        const quantity = row.querySelector('input[placeholder="Quantity"]').value;
        const rate = row.querySelector('input[placeholder="Rate"]').value;
        const mrp = row.querySelector('input[placeholder="MRP"]').value;
        const hsnCode = row.querySelector('input[placeholder="HSN Code"]').value;
        const discount = row.querySelector('input[placeholder="Discount %"]').value;
        const total = row.querySelector('.total').value;

        const billRow = document.createElement('tr');
        billRow.innerHTML = `
            <td>${medicineName}</td>
            <td>${quantity}</td>
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
function downloadBill() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

  
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text('Bill Summary', 14, 20);

   
    doc.setFontSize(12);
    doc.text('Your Company Name', 14, 30);
    doc.text('Address: 123 Main St, City, Country', 14, 35);
    doc.text('Contact: +1234567890', 14, 40);
    doc.text('Email: info@yourcompany.com', 14, 45);

    
    doc.setLineWidth(0.5);
    doc.line(14, 50, 200, 50);
    doc.setLineWidth(0); 

    // "To" Section
    const buyerName = document.getElementById('buyer-name').value || 'N/A';
    const buyerAddress = document.getElementById('buyer-address').value || 'N/A';
    const buyerContact = document.getElementById('buyer-contact').value || 'N/A';
    const buyerGstin = document.getElementById('buyer-gstin').value || 'N/A';

    doc.setFontSize(12);
    doc.text(`To: ${buyerName}`, 160, 30);
    doc.text(`Address: ${buyerAddress}`, 160, 35);
    doc.text(`Contact: ${buyerContact}`, 160, 40);
    doc.text(`GSTIN: ${buyerGstin}`, 160, 45);

 
    const table = document.querySelector('.bill-table');
    doc.autoTable({
        html: table,
        startY: 55,
        margin: { horizontal: 14 },
        theme: 'striped',
        headStyles: {
            fillColor: [230, 230, 230],
            textColor: [0, 0, 0],
            fontStyle: 'bold'
        },
        bodyStyles: {
            textColor: [0, 0, 0],
            lineWidth: 0.1
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245]
        },
        styles: {
            fontSize: 10,
            cellPadding: 3
        },
        columnStyles: {
            6: { halign: 'right' } 
        }
    });

    // Total
    const grandTotal = document.getElementById('bill-grand-total').innerText;
    doc.setFontSize(12);
    doc.text(`Grand Total: ${grandTotal} ₹`, 14, doc.lastAutoTable.finalY + 10);

   
    doc.setFontSize(10);
    doc.text('Thank you for your business!', 14, doc.internal.pageSize.height - 20);
    doc.text('For any queries, contact us at info@yourcompany.com', 14, doc.internal.pageSize.height - 15);

    // Save PDF
    doc.save('bill-summary.pdf');
}


document.querySelectorAll('.medicine-row').forEach(row => {
    row.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            calculateTotal(row);
            calculateGrandTotal();
        });
    });
});
