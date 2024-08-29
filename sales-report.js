/* Open the side panel */
function openPanel() {
  document.getElementById("mySidePanel").style.width = "250px";
}

/* Close the side panel */
function closePanel() {
  document.getElementById("mySidePanel").style.width = "0";
}

// Pie chart data for all charts
const data = {
  labels: ["Sales", "Purchase", "Stock"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

// Initialize the first pie chart
new Chart(document.getElementById("pieChart1").getContext("2d"), {
  type: "pie",
  data: data,
  options: options,
});

// Initialize the second pie chart
new Chart(document.getElementById("pieChart2").getContext("2d"), {
  type: "pie",
  data: data,
  options: options,
});

// Initialize the third pie chart
new Chart(document.getElementById("pieChart3").getContext("2d"), {
  type: "pie",
  data: data,
  options: options,
});

// Initialize the fourth pie chart
new Chart(document.getElementById("pieChart4").getContext("2d"), {
  type: "pie",
  data: data,
  options: options,
});
