/* Open the side panel */
function openPanel() {
  document.getElementById("mySidePanel").style.width = "250px";
}

/* Close the side panel */
function closePanel() {
  document.getElementById("mySidePanel").style.width = "0";
}

// Pie chart data for all charts
const data1 = {
  labels: ["Sales", "Purchase"],
  datasets: [
    {
      data: [30, 50],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        // "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const data2 = {
  labels: ["med1", "med2", "med3", "med4", "med5"],
  datasets: [
    {
      data: [30, 50, 100, 60, 70],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "#2a9d8f",
        "#48cae4",
      ],
      hoverOffset: 4,
    },
  ],
};

const data3 = {
  labels: ["Attained", "Remaining "],
  datasets: [
    {
      data: [85, 15],
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
  data: data1,
  options: options,
});

// Initialize the second pie chart
new Chart(document.getElementById("pieChart2").getContext("2d"), {
  type: "pie",
  data: data2,
  options: options,
});

// Initialize the third pie chart
new Chart(document.getElementById("pieChart3").getContext("2d"), {
  type: "pie",
  data: data3,
  options: options,
});

const ctx = document.getElementById("salesChart").getContext("2d");

// Data for the line graph
const salesData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Current - Sales",
      data: [80, 75, 85, 95, 87, 99, 102, 79, 83, 97, 91, 100],
      borderColor: "green",
      fill: false,
      tension: 0.1,
    },
    {
      label: "Previous Year Sales",
      data: [87, 94, 81, 90, 98, 79, 78, 103, 93, 83, 90, 96],
      borderColor: "blue",
      fill: false,
      tension: 0.1,
    },
    {
      label: "Target Sales",
      data: Array(12).fill(100), // Constant target line
      borderColor: "red",
      borderDash: [5, 5], // Dotted line
      fill: false,
    },
  ],
};

// Config for the line graph
const config = {
  type: "line",
  data: salesData,
  options: {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        max: 180, // Adjust this value based on your data
      },
    },
  },
};

// Render the chart
const salesChart = new Chart(ctx, config);
