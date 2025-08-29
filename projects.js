// Initialize Feather icons
feather.replace();

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation();
  menu.classList.toggle('active');
  hamburger.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (menu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close menu when clicking on a menu item (mobile)
menu.addEventListener('click', function(e) {
  if (e.target.tagName === 'A') {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close menu on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && menu.classList.contains('active')) {
    menu.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Dark/Light mode toggle functionality
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

// Certificate carousel functionality
class CertificateCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.certificate-slide');
    this.prevBtn = document.getElementById('prevSlide');
    this.nextBtn = document.getElementById('nextSlide');
    this.indicatorsContainer = document.getElementById('carouselIndicators');
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoAdvanceInterval = null;
    
    this.init();
  }
  
  init() {
    this.createIndicators();
    this.bindEvents();
    this.updateCarousel();
    this.startAutoAdvance();
  }
  
  createIndicators() {
    this.indicatorsContainer.innerHTML = '';
    for (let i = 0; i < this.totalSlides; i++) {
      const indicator = document.createElement('button');
      indicator.addEventListener('click', () => this.goToSlide(i));
      this.indicatorsContainer.appendChild(indicator);
    }
  }
  
  bindEvents() {
    this.prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoAdvance();
    });
    
    this.nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoAdvance();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.prevSlide();
        this.resetAutoAdvance();
      }
      if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoAdvance();
      }
    });
    
    // Touch/swipe support
    let startX = 0;
    let endX = 0;
    
    const carousel = document.querySelector('.certificate-carousel-wrapper');
    
    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    carousel.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
      this.resetAutoAdvance();
    });
    
    // Pause auto-advance on hover
    carousel.addEventListener('mouseenter', () => {
      this.pauseAutoAdvance();
    });
    
    carousel.addEventListener('mouseleave', () => {
      this.startAutoAdvance();
    });
  }
  
  handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
  
  updateCarousel() {
    // Update slides with smooth transition
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });
    
    // Update indicators
    const indicators = this.indicatorsContainer.querySelectorAll('button');
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateCarousel();
    this.resetAutoAdvance();
  }
  
  startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 seconds
  }
  
  pauseAutoAdvance() {
    if (this.autoAdvanceInterval) {
      clearInterval(this.autoAdvanceInterval);
    }
  }
  
  resetAutoAdvance() {
    this.pauseAutoAdvance();
    this.startAutoAdvance();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new CertificateCarousel();
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

// Add loading animation for project cards
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

// Apply animation to project cards
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.certificate-img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      // Create placeholder
      const placeholder = document.createElement('div');
      placeholder.style.cssText = `
        width: 100%;
        height: 250px;
        background: var(--border-light);
        border: 3px dashed var(--accent-orange);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-medium);
        font-style: italic;
        margin-bottom: 1.5rem;
        font-size: 1.1rem;
      `;
      placeholder.textContent = 'Certificate image not found';
      this.parentNode.insertBefore(placeholder, this);
    });
  });
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-orange), var(--light-orange));
  z-index: 9999;
  transition: width 0.3s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
  const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollProgress.style.width = scrollPercent + '%';
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
  z-index: 1000;
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
