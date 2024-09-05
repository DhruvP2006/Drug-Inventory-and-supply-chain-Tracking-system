const distributorForm = document.getElementById("distributorForm");
const distributorCards = document.getElementById("distributorCards");

// Load distributor cards from local storage on page load
window.addEventListener("load", loadDistributorsFromStorage);

distributorForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const distributorName = document.getElementById("distributorName").value;
  const distributorEmail = document.getElementById("distributorEmail").value;
  const distributorPhone = document.getElementById("distributorPhone").value;
  const distributorAddress =
    document.getElementById("distributorAddress").value;

  const distributorCard = createDistributorCard(
    distributorName,
    distributorEmail,
    distributorPhone,
    distributorAddress
  );
  distributorCards.appendChild(distributorCard);

  saveDistributorToStorage(
    distributorName,
    distributorEmail,
    distributorPhone,
    distributorAddress
  );

  distributorForm.reset();
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("distributorModal")
  );
  modal.hide();
});

// Remove distributor card
distributorCards.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const distributorCard = event.target.closest(".distributor-card");
    const distributorInfo = JSON.parse(distributorCard.dataset.distributorInfo);
    removeDistributorFromStorage(distributorInfo);
    distributorCard.remove();
  }
});

function createDistributorCard(name, email, phone, address) {
  const distributorCard = document.createElement("div");
  distributorCard.classList.add("col-md-4", "distributor-card");
  distributorCard.dataset.distributorInfo = JSON.stringify({
    name,
    email,
    phone,
    address,
  });
  distributorCard.innerHTML = `
  <div class="card-container">  
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text"><strong>Email:</strong> ${email}</p>
        <p class="card-text"><strong>Phone:</strong> ${phone}</p>
        <p class="card-text"><strong>Address:</strong> ${address}</p>
        <button class="btn btn-danger btn-sm remove-btn">Remove</button>
      </div>
    </div>
    </div>
  `;
  return distributorCard;
}

function saveDistributorToStorage(name, email, phone, address) {
  const distributors = JSON.parse(localStorage.getItem("distributors")) || [];
  distributors.push({ name, email, phone, address });
  localStorage.setItem("distributors", JSON.stringify(distributors));
}

function removeDistributorFromStorage(distributorInfo) {
  const distributors = JSON.parse(localStorage.getItem("distributors")) || [];
  const updatedDistributors = distributors.filter(
    (distributor) =>
      distributor.name !== distributorInfo.name ||
      distributor.email !== distributorInfo.email ||
      distributor.phone !== distributorInfo.phone ||
      distributor.address !== distributorInfo.address
  );
  localStorage.setItem("distributors", JSON.stringify(updatedDistributors));
}

function loadDistributorsFromStorage() {
  const distributors = JSON.parse(localStorage.getItem("distributors")) || [];
  distributors.forEach((distributor) => {
    const distributorCard = createDistributorCard(
      distributor.name,
      distributor.email,
      distributor.phone,
      distributor.address
    );
    distributorCards.appendChild(distributorCard);
  });
}
