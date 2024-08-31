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
