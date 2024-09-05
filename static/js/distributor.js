// Get the modal
var modal = document.getElementById("myModal");

// Get the link that opens the modal
var link = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the link, open the modal
link.onclick = function (event) {
  event.preventDefault();
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

/* Open the side panel */
function openPanel() {
  document.getElementById("mySidePanel").style.width = "250px";
}

/* Close the side panel */
function closePanel() {
  document.getElementById("mySidePanel").style.width = "0";
}

document.addEventListener("DOMContentLoaded", () => {
  const addDistributorBtn = document.getElementById("addDistributorBtn");
  const distributorModal = new bootstrap.Modal(
    document.getElementById("distributorModal")
  );
  const distributorForm = document.getElementById("distributorForm");
  const distributorCardsContainer = document.getElementById(
    "distributorCardsContainer"
  );

  addDistributorBtn.addEventListener("click", () => {
    distributorModal.show();
  });

  distributorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("distributorName").value;
    const email = document.getElementById("distributorEmail").value;
    const phone = document.getElementById("distributorPhone").value;
    const address = document.getElementById("distributorAddress").value;

    // Create the distributor card
    const card = document.createElement("div");
    card.className = "card col-md-4";
    card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text"><strong>Email:</strong> ${email}</p>
                <p class="card-text"><strong>Phone:</strong> ${phone}</p>
                <p class="card-text"><strong>Address:</strong> ${address}</p>
                <button class="btn btn-danger btn-sm remove-btn">Remove</button>
            </div>
        `;

    // Append the card to the container
    distributorCardsContainer.appendChild(card);

    // Clear the form
    distributorForm.reset();

    // Hide the modal
    distributorModal.hide();
  });

  // Remove distributor card
  distributorCardsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
      e.target.closest(".card").remove();
    }
  });
});
