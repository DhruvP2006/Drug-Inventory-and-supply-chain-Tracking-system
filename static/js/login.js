document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorMessage = document.getElementById("error-message");

    // Simple validation for demonstration purposes
    if (username === "user" && password === "pass") {
      alert("Login successful!");
      // You can redirect to another page here
    } else {
      errorMessage.textContent = "Invalid username or password";
      errorMessage.style.display = "block";
    }
  });
