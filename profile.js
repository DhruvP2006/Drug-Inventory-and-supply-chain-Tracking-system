document
  .getElementById("add-employee-card")
  .addEventListener("click", function () {
    let cardContainer = document.getElementById("employee-cards");

    let initialCard = document.querySelector(".employee-card");
    let newCard = initialCard.cloneNode(true);

    newCard.querySelector(".employee-name").value = "";
    newCard.querySelector(".employee-number").value = "";
    newCard.querySelector(".employee-details").value = "";

    cardContainer.appendChild(newCard);
  });

document.getElementById("save-profile").addEventListener("click", function () {
  let name = document.getElementById("profile-name").value;
  let designation = document.getElementById("profile-designation").value;
  let address = document.getElementById("profile-address").value;
  let phone = document.getElementById("profile-phone").value;
  let gstin = document.getElementById("profile-GSTIN").value;

  document.getElementById("id-card-name").textContent = name;
  document.getElementById("id-card-designation").textContent = designation;
  document.getElementById("id-card-address").textContent = address;
  document.getElementById("id-card-phone").textContent = phone;

  document.getElementById("profile-section").style.display = "none";
  document.getElementById("id-card-section").style.display = "block";
});

// Edit button functionality
document.getElementById("edit-icon").addEventListener("click", function () {
  document.getElementById("profile-section").style.display = "block";
  document.getElementById("id-card-section").style.display = "none";

  document.getElementById("profile-name").value =
    document.getElementById("id-card-name").textContent;
  document.getElementById("profile-designation").value =
    document.getElementById("id-card-designation").textContent;
  document.getElementById("profile-address").value =
    document.getElementById("id-card-address").textContent;
  document.getElementById("profile-phone").value =
    document.getElementById("id-card-phone").textContent;
});
document.querySelectorAll(".add-note-button").forEach((button) => {
  button.addEventListener("click", function () {
    const category = this.getAttribute("data-category");
    const contentDiv = document.querySelector(`#${category} .notes-content`);

    const newNote = document.createElement("div");
    newNote.className = "note-item";
    newNote.innerHTML = `
            <textarea placeholder="Enter your note here..."></textarea>
            <button class="delete-note-button">Delete</button>
        `;

    contentDiv.appendChild(newNote);

    newNote
      .querySelector(".delete-note-button")
      .addEventListener("click", function () {
        contentDiv.removeChild(newNote);
      });
  });
});

document.getElementById("save-notes").addEventListener("click", function () {
  alert("Notes saved successfully!");
});
