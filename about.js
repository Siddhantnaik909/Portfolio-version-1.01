
// Initialize Feather icons
feather.replace();

// Mobile Navigation - Same as other pages
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

// Dark/Light mode toggle - Same as other pages
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

// Add loading animation for sections
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

// Apply animation to sections
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.profile-card, .interests-card, .skills-card, .projects-card, .connect-card');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(section);
  });
});

// Skill tag interactions
document.addEventListener('DOMContentLoaded', function() {
  const skillTags = document.querySelectorAll('.skill-tag');
  
  skillTags.forEach(tag => {
    tag.addEventListener('click', function() {
      // Add a pulse animation on click
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'translateY(-3px)';
      }, 150);
    });
  });
});

// Social links tracking (optional)
document.addEventListener('DOMContentLoaded', function() {
  const socialLinks = document.querySelectorAll('.social-link');
  
  socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const platform = this.querySelector('span').textContent;
      console.log(`Clicked on ${platform} link`);
      
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
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

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--accent-orange);
  color: var(--dark-brown);
  border: 2px solid var(--light-orange);
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px var(--shadow-brown);
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.style.opacity = '1';
    scrollToTopBtn.style.visibility = 'visible';
  } else {
    scrollToTopBtn.style.opacity = '0';
    scrollToTopBtn.style.visibility = 'hidden';
  }
});

scrollToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

scrollToTopBtn.addEventListener('mouseenter', function() {
  this.style.background = 'var(--light-orange)';
  this.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', function() {
  this.style.background = 'var(--accent-orange)';
  this.style.transform = 'scale(1)';
});

// Error handling for profile image
document.addEventListener('DOMContentLoaded', function() {
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.addEventListener('error', function() {
      // Create a placeholder if image fails to load
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 200px;
        height: 200px;
        border-radius: 50%;
        background: var(--border-light);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-medium);
        font-size: 3rem;
        border: 4px solid var(--accent-orange);
      `;
      placeholder.innerHTML = '👤';
      this.parentNode.insertBefore(placeholder, this);
      this.style.display = 'none';
    });
  }
});
