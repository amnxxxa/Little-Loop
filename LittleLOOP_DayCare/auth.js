// Authentication JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Login form handler
  const loginForm = document.getElementById("loginForm")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const userType = document.getElementById("userType").value

      // Simple validation
      if (!email || !password || !userType) {
        alert("Please fill in all fields")
        return
      }

      // Simulate login
      const userData = {
        email: email,
        userType: userType,
        name: userType === "parent" ? "Sarah Johnson" : "Ms. Jennifer",
        loginTime: new Date().toISOString(),
      }

      localStorage.setItem("littleloop_user", JSON.stringify(userData))
      localStorage.setItem("littleloop_user_type", userType)

      // Redirect based on user type
      if (userType === "parent") {
        window.location.href = "parent-dashboard.html"
      } else {
        window.location.href = "caregiver-dashboard.html"
      }
    })
  }

  // Signup form handler
  const signupForm = document.getElementById("signupForm")
  if (signupForm) {
    const userTypeSelect = document.getElementById("userType")
    const childNameGroup = document.getElementById("childNameGroup")
    const daycareGroup = document.getElementById("daycareGroup")

    // Show/hide fields based on user type
    userTypeSelect.addEventListener("change", function () {
      if (this.value === "parent") {
        childNameGroup.style.display = "block"
        daycareGroup.style.display = "block"
      } else {
        childNameGroup.style.display = "none"
        daycareGroup.style.display = "none"
      }
    })

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
        userType: document.getElementById("userType").value,
        childName: document.getElementById("childName").value,
        daycare: document.getElementById("daycare").value,
      }

      // Validation
      if (!formData.fullName || !formData.email || !formData.password || !formData.userType) {
        alert("Please fill in all required fields")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      if (formData.userType === "parent" && (!formData.childName || !formData.daycare)) {
        alert("Please provide your child's name and select a daycare center")
        return
      }

      // Simulate account creation
      const userData = {
        name: formData.fullName,
        email: formData.email,
        userType: formData.userType,
        childName: formData.childName,
        daycare: formData.daycare,
        signupTime: new Date().toISOString(),
      }

      localStorage.setItem("littleloop_user", JSON.stringify(userData))
      localStorage.setItem("littleloop_user_type", formData.userType)

      alert("Account created successfully! Welcome to LittleLoop!")

      // Redirect based on user type
      if (formData.userType === "parent") {
        window.location.href = "parent-dashboard.html"
      } else {
        window.location.href = "caregiver-dashboard.html"
      }
    })
  }
})

// Check if user is logged in (for protected pages)
function checkAuth() {
  const user = localStorage.getItem("littleloop_user")
  if (!user) {
    window.location.href = "login.html"
    return false
  }
  return JSON.parse(user)
}

// Password strength indicator
function checkPasswordStrength(password) {
  let strength = 0
  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  return strength
}

// Add password strength indicator to signup form
document.addEventListener("DOMContentLoaded", () => {
  const passwordInput = document.getElementById("password")
  if (passwordInput) {
    const strengthIndicator = document.createElement("div")
    strengthIndicator.style.cssText = `
            margin-top: 0.5rem;
            font-size: 0.875rem;
        `
    passwordInput.parentNode.appendChild(strengthIndicator)

    passwordInput.addEventListener("input", function () {
      const strength = checkPasswordStrength(this.value)
      const messages = ["Very Weak", "Weak", "Fair", "Good", "Strong"]
      const colors = ["#dc2626", "#f59e0b", "#eab308", "#10b981", "#059669"]

      strengthIndicator.textContent = `Password Strength: ${messages[strength]}`
      strengthIndicator.style.color = colors[strength]
    })
  }
})
