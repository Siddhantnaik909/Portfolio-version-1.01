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

// Add loading animation for certificate cards
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

// Apply animation to certificate cards
document.addEventListener('DOMContentLoaded', function() {
  const certificateCards = document.querySelectorAll('.certificate-card');
  certificateCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Also animate other sections
  const animatedSections = document.querySelectorAll('.intro-card, .cta-card');
  animatedSections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
    observer.observe(section);
  });
});

// Counter animation for hero stats
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const current = Math.floor(progress * target);
    element.textContent = current + '+';
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// Animate counters when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const statNumbers = document.querySelectorAll('.stat-number');
  const targets = [8, 5, 3]; // Corresponding to the stat values
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        animateCounter(entry.target, targets[index]);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
});

// Certificate button click tracking
document.addEventListener('DOMContentLoaded', function() {
  const certificateBtns = document.querySelectorAll('.certificate-btn');
  
  certificateBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.textContent.includes('Download') ? 'download' : 'view';
      const certificateName = this.closest('.certificate-card').querySelector('h3').textContent;
      
      console.log(`Certificate ${action}: ${certificateName}`);
      
      // Add visual feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});

// Error handling for certificate images
document.addEventListener('DOMContentLoaded', function() {
  const certificateImages = document.querySelectorAll('.certificate-img');
  
  certificateImages.forEach(img => {
    img.addEventListener('error', function() {
      // Create a placeholder if image fails to load
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 250px;
        background: var(--border-light);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-medium);
        font-size: 1.1rem;
        border-radius: 0;
      `;
      placeholder.textContent = 'Certificate image not available';
      this.parentNode.insertBefore(placeholder, this);
      this.style.display = 'none';
    });
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
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

// Loading screen (optional)
document.addEventListener('DOMContentLoaded', function() {
  // Add a subtle loading animation
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 100);
});


