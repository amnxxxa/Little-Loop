// Caregiver Dashboard JavaScript

function checkAuth() {
  // Placeholder for authentication check
  return { userType: "caregiver" } // Simulate logged in user as caregiver
}

function showNotification(message, type = "success") {
  // Placeholder for notification function
  alert(message) // Simple alert for demonstration
}

document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in as caregiver
  const user = checkAuth()
  if (user && user.userType !== "caregiver") {
    alert("Access denied. This page is for caregivers only.")
    window.location.href = "login.html"
    return
  }

  // Activity form handler
  const activityForm = document.getElementById("activityForm")
  if (activityForm) {
    let selectedMood = ""

    // Mood button handlers
    document.querySelectorAll(".mood-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        document.querySelectorAll(".mood-btn").forEach((b) => {
          b.style.background = "none"
          b.style.transform = "scale(1)"
        })

        // Add active state to clicked button
        this.style.background = "var(--light-green)"
        this.style.transform = "scale(1.1)"
        selectedMood = this.dataset.mood
      })
    })

    activityForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        child: document.getElementById("childSelect").value,
        activityType: document.getElementById("activityType").value,
        notes: document.getElementById("activityNotes").value,
        mood: selectedMood,
        timestamp: new Date().toISOString(),
      }

      if (!formData.child || !formData.activityType || !formData.mood) {
        alert("Please fill in all required fields and select a mood")
        return
      }

      // Simulate saving activity
      console.log("Activity logged:", formData)

      // Add to recent activities (simulate)
      addToRecentActivities(formData)

      // Show success message
      showNotification("Activity logged successfully!")

      // Reset form
      activityForm.reset()
      selectedMood = ""
      document.querySelectorAll(".mood-btn").forEach((b) => {
        b.style.background = "none"
        b.style.transform = "scale(1)"
      })
    })
  }
})

function addToRecentActivities(activity) {
  const activityLog = document.querySelector(".activity-log")
  if (activityLog) {
    const childName = getChildName(activity.child)
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    const moodEmoji = getMoodEmoji(activity.mood)

    const newRow = document.createElement("div")
    newRow.style.cssText = `
            display: grid; 
            grid-template-columns: 1fr 2fr 1fr 1fr; 
            gap: 1rem; 
            padding: 0.75rem; 
            border-bottom: 1px solid var(--border-gray);
            background: var(--light-green);
            animation: fadeIn 0.5s ease-out;
        `

    newRow.innerHTML = `
            <span>${time}</span>
            <span>${childName} - ${activity.activityType}</span>
            <span>${moodEmoji}</span>
            <span style="color: var(--primary-green);">Sent</span>
        `

    // Insert after header
    const header = activityLog.firstElementChild
    activityLog.insertBefore(newRow, header.nextSibling)
  }
}

function getChildName(childId) {
  const names = {
    emma: "Emma Johnson",
    liam: "Liam Smith",
    sophia: "Sophia Davis",
    noah: "Noah Wilson",
  }
  return names[childId] || "Unknown Child"
}

function getMoodEmoji(mood) {
  const moods = {
    happy: "😊",
    neutral: "😐",
    sad: "😢",
    excited: "🤗",
  }
  return moods[mood] || "😊"
}

// Quick action functions
function sharePhoto() {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Simulate photo upload
      showNotification(`Photo "${file.name}" shared with parents!`)
    }
  }
  input.click()
}

function sendMessage() {
  const recipient = prompt("Send message to which parent? (Enter child name)")
  if (recipient) {
    const message = prompt("Enter your message:")
    if (message) {
      showNotification(`Message sent to ${recipient}'s parents!`)
    }
  }
}

function emergencyAlert() {
  const child = prompt("Emergency alert for which child? (Enter child name)")
  if (child) {
    const message = prompt("Describe the emergency:")
    if (message) {
      const confirmed = confirm(`Send emergency alert for ${child}?\n\nMessage: ${message}`)
      if (confirmed) {
        showNotification(`Emergency alert sent for ${child}!`, "error")
      }
    }
  }
}

// Auto-save form data
let autoSaveInterval

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("activityForm")
  if (form) {
    // Load saved data
    loadFormData()

    // Auto-save every 30 seconds
    autoSaveInterval = setInterval(saveFormData, 30000)

    // Save on form change
    form.addEventListener("input", debounce(saveFormData, 1000))
  }
})

function saveFormData() {
  const formData = {
    child: document.getElementById("childSelect")?.value || "",
    activityType: document.getElementById("activityType")?.value || "",
    notes: document.getElementById("activityNotes")?.value || "",
  }

  localStorage.setItem("caregiver_form_draft", JSON.stringify(formData))
}

function loadFormData() {
  const saved = localStorage.getItem("caregiver_form_draft")
  if (saved) {
    const data = JSON.parse(saved)
    if (document.getElementById("childSelect")) document.getElementById("childSelect").value = data.child
    if (document.getElementById("activityType")) document.getElementById("activityType").value = data.activityType
    if (document.getElementById("activityNotes")) document.getElementById("activityNotes").value = data.notes
  }
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Clear auto-save when form is submitted
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("activityForm")
  if (form) {
    form.addEventListener("submit", () => {
      localStorage.removeItem("caregiver_form_draft")
      clearInterval(autoSaveInterval)
    })
  }
})
