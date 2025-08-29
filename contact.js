// Initialize Feather icons
feather.replace();

// Mobile Navigation - Same as resume.html
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Toggle mobile navigation
hamburger.addEventListener('click', function() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close mobile navigation when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}));

// Close mobile navigation when clicking outside
document.addEventListener('click', function(event) {
  const isClickInsideNav = navMenu.contains(event.target);
  const isClickOnHamburger = hamburger.contains(event.target);
  
  if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Handle window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Dark/Light mode toggle - Same as resume.html
const toggleTheme = document.getElementById('toggle-theme');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  toggleTheme.textContent = '☀️';
} else {
  toggleTheme.textContent = '🌙';
}

toggleTheme.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    toggleTheme.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    toggleTheme.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

// Form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Simple form validation
  if (!data.first_name || !data.last_name || !data.user_email || !data.subject || !data.message) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (!isValidEmail(data.user_email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }
  
  // Simulate form submission
  showLoadingState();
  
  // Simulate API call delay
  setTimeout(() => {
    hideLoadingState();
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    
    // Add success animation
    contactForm.classList.add('form-success');
    setTimeout(() => {
      contactForm.classList.remove('form-success');
    }, 500);
    
  }, 2000);
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Loading state for form submission
function showLoadingState() {
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i data-feather="loader"></i> Sending...';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';
  
  // Re-initialize feather icons for the loader
  feather.replace();
  
  // Store original text for later
  submitBtn.setAttribute('data-original-text', originalText);
}

function hideLoadingState() {
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.getAttribute('data-original-text');
  
  submitBtn.innerHTML = originalText;
  submitBtn.disabled = false;
  submitBtn.style.opacity = '1';
  
  // Re-initialize feather icons
  feather.replace();
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i data-feather="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i data-feather="x"></i>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 2000;
    background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
    color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
    border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
    border-radius: 12px;
    padding: 1rem 1.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    animation: slideInRight 0.3s ease-out;
    max-width: 400px;
    font-weight: 500;
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }
    .notification-close {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.2rem;
      margin-left: auto;
      opacity: 0.7;
      transition: opacity 0.2s;
    }
    .notification-close:hover {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
  
  // Add to page
  document.body.appendChild(notification);
  
  // Initialize feather icons in notification
  feather.replace();
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation for contact sections
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply animation to contact elements
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.contact-info-card, .contact-form-card, .social-section');
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(element);
  });
});

// Fix viewport height for mobile browsers
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Set the viewport height on page load and window resize
setViewportHeight();
window.addEventListener('resize', setViewportHeight);

// Prevent horizontal scroll
document.addEventListener('DOMContentLoaded', function() {
  document.body.style.overflowX = 'hidden';
  document.documentElement.style.overflowX = 'hidden';
});

// Enhanced form input interactions
document.addEventListener('DOMContentLoaded', function() {
  const formInputs = document.querySelectorAll('.form-input');
  
  formInputs.forEach(input => {
    // Add focus and blur effects
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      if (this.value.trim() !== '') {
        this.parentElement.classList.add('filled');
      } else {
        this.parentElement.classList.remove('filled');
      }
    });
    
    // Check if input has value on page load
    if (input.value.trim() !== '') {
      input.parentElement.classList.add('filled');
    }
  });
});
