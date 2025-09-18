// LittleLoop Main JavaScript File

// Function to create and animate background dots
function createDots() {
  const dotsContainer = document.querySelector(".background-dots");
  const colors = [
    "rgba(0, 128, 0, 0.4)",   // softer green
    "rgba(0, 180, 255, 0.4)", // softer blue
    "rgba(255, 100, 150, 0.4)", // soft pink
    "rgba(255, 200, 0, 0.4)"  // soft yellow
  ];
  const numDots = 35;

  for (let i = 0; i < numDots; i++) {
    const dot = document.createElement("span");
    const size = Math.random() * 22 + 12;
    const duration = Math.random() * 8 + 7;
    const delay = Math.random() * 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const leftPosition = Math.random() * 100;

    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = color;
    dot.style.borderRadius = "50%";
    dot.style.position = "absolute";
    dot.style.left = `${leftPosition}%`;
    dot.style.top = `${-size}px`;
    dot.style.animation = `moveDots ${duration}s linear ${delay}s infinite`;
    dot.style.opacity = "0.4"; // softer opacity

    dotsContainer.appendChild(dot);
  }
}

// Run on load
document.addEventListener("DOMContentLoaded", createDots);


// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe all cards and feature elements
  document.querySelectorAll(".card, .feature-card").forEach((el) => {
    observer.observe(el)
  })

  // Mobile menu toggle (if needed)
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  }
})

// Utility functions
function logout() {
  localStorage.removeItem("littleloop_user")
  localStorage.removeItem("littleloop_user_type")
  alert("You have been logged out successfully!")
  window.location.href = "index.html"
}

function openChat() {
  alert("Chat feature coming soon! For now, please use our contact form or email us at hello@littleloop.com")
}

function sharePhoto() {
  alert("Photo sharing feature will open your device camera or photo library.")
}

function sendMessage() {
  alert("Message composer will open here.")
}

function emergencyAlert() {
  const confirmed = confirm("Are you sure you want to send an emergency alert to all parents?")
  if (confirmed) {
    alert("Emergency alert sent to all parents!")
  }
}

// Contact form handler
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        userType: document.getElementById("userType").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      }

      // Simulate form submission
      alert("Thank you for your message! We will get back to you within 24 hours.")
      contactForm.reset()
    })
  }
})

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading states to buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn") && e.target.type === "submit") {
    const originalText = e.target.textContent
    e.target.textContent = "Loading..."
    e.target.disabled = true

    setTimeout(() => {
      e.target.textContent = originalText
      e.target.disabled = false
    }, 2000)
  }
})

// Simple notification system
function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "success" ? "var(--primary-purple)" : "#dc2626"};
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

// Add CSS for notification animation
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`
document.head.appendChild(style)
