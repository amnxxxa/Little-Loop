// Reports Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as parent
  const user = checkAuth()
  if (user && user.userType !== "parent") {
    alert("Access denied. This page is for parents only.")
    window.location.href = "login.html"
    return
  }

  // Initialize charts
  initializeMoodChart()
  initializeActivityChart()
})

function checkAuth() {
  const user = localStorage.getItem("littleloop_user")
  if (!user) {
    window.location.href = "login.html"
    return false
  }
  return JSON.parse(user)
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "var(--primary-green)" : "#dc2626"};
        color: white;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}

function initializeMoodChart() {
  const ctx = document.getElementById("moodChart")
  if (ctx) {
    const Chart = window.Chart // Assuming Chart is available globally in vanilla JS environment
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Mood Score",
            data: [4, 5, 4, 5, 5, 4, 5],
            borderColor: "#15803d",
            backgroundColor: "rgba(21, 128, 61, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              callback: (value) => {
                const moods = ["😢", "😕", "😐", "😊", "🤗"]
                return moods[value - 1] || ""
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    })
  }
}

function initializeActivityChart() {
  const ctx = document.getElementById("activityChart")
  if (ctx) {
    const Chart = window.Chart // Assuming Chart is available globally in vanilla JS environment
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Play Time", "Meals", "Nap Time", "Learning", "Art & Crafts"],
        datasets: [
          {
            data: [30, 25, 20, 15, 10],
            backgroundColor: ["#15803d", "#ec4899", "#fbbf24", "#8b5cf6", "#06b6d4"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    })
  }
}

function downloadReport() {
  // Simulate PDF generation
  showNotification("Generating PDF report...")

  setTimeout(() => {
    // Create a mock download
    const link = document.createElement("a")
    link.href = "#"
    link.download = "emma-progress-report.pdf"
    link.textContent = "Download Report"

    showNotification("Report downloaded successfully!")
  }, 2000)
}

function emailReport() {
  const email = prompt("Enter email address to send the report:")
  if (email && validateEmail(email)) {
    showNotification(`Report will be sent to ${email}`)
  } else if (email) {
    alert("Please enter a valid email address")
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Report period change handler
document.addEventListener("DOMContentLoaded", () => {
  const periodSelect = document.querySelector("select")
  if (periodSelect) {
    periodSelect.addEventListener("change", () => {
      showNotification("Updating report data...")

      // Simulate data refresh
      setTimeout(() => {
        showNotification("Report updated successfully!")
        // Here you would typically refresh the charts with new data
      }, 1500)
    })
  }
})

// Print report functionality
function printReport() {
  window.print()
}

// Add print styles
const printStyles = document.createElement("style")
printStyles.textContent = `
    @media print {
        .navbar, .footer, .btn {
            display: none !important;
        }
        
        .container {
            max-width: none !important;
            padding: 0 !important;
        }
        
        .card {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            break-inside: avoid;
        }
        
        .dashboard-header {
            background: white !important;
            color: black !important;
        }
    }
`
document.head.appendChild(printStyles)

// Export data functionality
function exportData(format) {
  const data = {
    child: "Emma Johnson",
    period: "Last 7 Days",
    activities: [
      { date: "2025-12-08", activity: "Art Time", mood: "Happy", notes: "Created beautiful painting" },
      { date: "2025-12-07", activity: "Playground", mood: "Excited", notes: "Played with friends" },
      { date: "2025-12-06", activity: "Nap Time", mood: "Peaceful", notes: "Slept for 2 hours" },
    ],
  }

  if (format === "json") {
    const dataStr = JSON.stringify(data, null, 2)
    downloadFile("emma-data.json", dataStr, "application/json")
  } else if (format === "csv") {
    const csv = convertToCSV(data.activities)
    downloadFile("emma-data.csv", csv, "text/csv")
  }
}

function convertToCSV(data) {
  const headers = Object.keys(data[0]).join(",")
  const rows = data.map((row) => Object.values(row).join(","))
  return [headers, ...rows].join("\n")
}

function downloadFile(filename, content, contentType) {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
