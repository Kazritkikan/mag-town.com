// ===== WELCOME MODAL =====
function closeRulesWarning() {
  const modal = document.getElementById('rulesWarningModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    localStorage.setItem('welcomeModalShown', 'true');
  }
}

// ===== DOWNLOAD CONFIRMATION MODAL =====
function showDownloadConfirmation() {
  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.style.display = 'flex';
  modal.id = 'downloadConfirmationModal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="heading text-3xl text-black">✅ Download Complete</h3>
      </div>
      <div class="modal-body">
        <div class="alert alert-success">
          <i class="fas fa-check-circle text-2xl"></i>
          <div>
            <p class="font-bold text-lg">Rules Downloaded Successfully</p>
            <p class="text-sm">Please read them carefully</p>
          </div>
        </div>
        <p class="text-lg font-semibold mt-4">You have downloaded the rules. Now read them.</p>
        <p class="text-zinc-600 mt-2">If you don't follow these rules after downloading, how can a guy be that dumbass? The rules are there for everyone's safety and community harmony.</p>
        <div class="mt-6 p-4 bg-green-50 border-2 border-green-400 rounded-xl">
          <p class="font-bold text-black">Next Step:</p>
          <p class="text-zinc-700">Read the downloaded rules document and ensure you understand all regulations.</p>
        </div>
      </div>
      <div class="modal-footer">
        <button onclick="closeDownloadConfirmation()" class="bg-[#facc15] text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors">
          I Will Read Them
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
}

function closeDownloadConfirmation() {
  const modal = document.getElementById('downloadConfirmationModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    setTimeout(() => modal.remove(), 300);
  }
}

// Check if user has already seen the welcome modal
if (!localStorage.getItem('welcomeModalShown')) {
  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('rulesWarningModal');
    if (modal) {
      document.body.style.overflow = 'hidden';
    }
  });
}

// ===== TOGGLE MOBILE MENU =====
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}
document.getElementById('mobileMenuToggle')?.addEventListener('click', toggleMobileMenu);

// ===== DOWNLOAD RULES =====
function downloadRules() {
  const link = document.createElement('a');
  link.href = 'rules-of-mag-town.txt';
  link.download = 'New-Rules-of-Mag-Town.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showDownloadConfirmation();
}

// ===== CONTACT MODAL =====
function showContactModal() {
  document.getElementById("contactModal").classList.remove("hidden");
  document.body.style.overflow = 'hidden';
}
function closeContactModal() {
  document.getElementById("contactModal").classList.add("hidden");
  document.body.style.overflow = '';
}
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById("contactName").value.trim();
  const phone = document.getElementById("contactPhone").value.trim();
  const message = document.getElementById("contactMessage").value.trim();
  const text = `Hi Mag Town! I'm interested in booking a visit.%0A%0A👤 Name: ${name}%0A📞 Phone: ${phone}%0A📝 Message: ${message || "—"}`;
  window.open(`https://wa.me/923001234567?text=${text}`, "_blank");
  closeContactModal();
  showToast('Message sent via WhatsApp!', 'success');
}
document.getElementById("contactModal")?.addEventListener("click", function(e) {
  if (e.target === this) closeContactModal();
});

// ===== FAQ ACCORDION =====
function toggleFAQ(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const icon = btn.querySelector('.fa-chevron-down');
  const isOpen = !answer.classList.contains('hidden');
  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
  document.querySelectorAll('.fa-chevron-down').forEach(i => i.style.transform = 'rotate(0deg)');
  // Toggle this
  if (!isOpen) {
    answer.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  }
}

// ===== ACCORDION =====
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.closest('.accordion-item');
      const isActive = item.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      
      // Open this if was closed
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.tabs-container').forEach(container => {
    const buttons = container.querySelectorAll('.tab-button');
    const contents = container.querySelectorAll('.tab-content');
    
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        contents[index].classList.add('active');
      });
    });
  });
}

// ===== DROPDOWN =====
function initDropdowns() {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });
    
    document.addEventListener('click', () => {
      dropdown.classList.remove('active');
    });
  });
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type = 'info') {
  const container = document.querySelector('.toast-container') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function createToastContainer() {
  const container = document.createElement('div');
  container.className = 'toast-container';
  document.body.appendChild(container);
  return container;
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
  if (localStorage.getItem('cookieConsent')) return;
  
  const consent = document.createElement('div');
  consent.className = 'cookie-consent';
  consent.innerHTML = `
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-white text-sm">We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.</p>
      <div class="flex gap-3">
        <button onclick="acceptCookies()" class="bg-[#facc15] text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">Accept</button>
        <button onclick="declineCookies()" class="bg-white text-black px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors">Decline</button>
      </div>
    </div>
  `;
  document.body.appendChild(consent);
  
  setTimeout(() => consent.classList.add('show'), 1000);
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  document.querySelector('.cookie-consent')?.remove();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  document.querySelector('.cookie-consent')?.remove();
}

// ===== LIGHTBOX =====
let currentLightboxIndex = 0;
let lightboxImages = [];

function initLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
    <button class="lightbox-nav lightbox-prev" onclick="navigateLightbox(-1)">&lsaquo;</button>
    <button class="lightbox-nav lightbox-next" onclick="navigateLightbox(1)">&rsaquo;</button>
    <img src="" alt="Lightbox image">
  `;
  document.body.appendChild(lightbox);
  
  document.querySelectorAll('.gallery-item img').forEach((img, index) => {
    img.parentElement.addEventListener('click', () => openLightbox(index, img.src));
  });
}

function openLightbox(index, src) {
  lightboxImages = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.src);
  currentLightboxIndex = index;
  const lightbox = document.getElementById('lightbox');
  lightbox.querySelector('img').src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
  if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;
  document.getElementById('lightbox').querySelector('img').src = lightboxImages[currentLightboxIndex];
}

// ===== TESTIMONIAL CAROUSEL =====
let currentTestimonial = 0;

function initTestimonialCarousel() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;
  
  const slides = track.querySelectorAll('.testimonial-slide');
  const totalSlides = slides.length;
  
  function updateCarousel() {
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    updateDots();
  }
  
  function updateDots() {
    document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentTestimonial);
    });
  }
  
  // Create dots
  const dotsContainer = document.querySelector('.carousel-dots') || createDotsContainer(track.parentElement);
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
  updateDots();
  
  // Navigation
  track.parentElement.querySelector('.carousel-prev')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + totalSlides) % totalSlides;
    updateCarousel();
  });
  
  track.parentElement.querySelector('.carousel-next')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % totalSlides;
    updateCarousel();
  });
  
  // Auto-play
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % totalSlides;
    updateCarousel();
  }, 5000);
}

function createDotsContainer(parent) {
  const container = document.createElement('div');
  container.className = 'carousel-dots';
  parent.appendChild(container);
  return container;
}

// ===== FORM VALIDATION =====
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateInput(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) validateInput(input);
      });
    });
    
    form.addEventListener('submit', (e) => {
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) isValid = false;
      });
      
      if (!isValid) {
        e.preventDefault();
        showToast('Please fix the errors before submitting', 'error');
      }
    });
  });
}

function validateInput(input) {
  const value = input.value.trim();
  const errorElement = input.parentElement.querySelector('.form-error');
  let isValid = true;
  let errorMessage = '';
  
  if (input.required && !value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (input.type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email';
  } else if (input.type === 'tel' && value && !isValidPhone(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid phone number';
  } else if (input.minLength && value.length < input.minLength) {
    isValid = false;
    errorMessage = `Minimum ${input.minLength} characters required`;
  }
  
  input.classList.toggle('error', !isValid);
  input.classList.toggle('success', isValid && value);
  
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.toggle('show', !isValid);
  }
  
  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9+\-\s]{10,}$/.test(phone);
}

// ===== STATS COUNTER =====
function initStatsCounter() {
  const counters = document.querySelectorAll('.stats-counter');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent);
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// ===== NEWSLETTER =====
function initNewsletter() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value.trim();
    
    if (isValidEmail(email)) {
      showToast('Thank you for subscribing!', 'success');
      form.reset();
    } else {
      showToast('Please enter a valid email', 'error');
    }
  });
}

// ===== PROGRESS BAR =====
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const target = bar.dataset.progress || '100';
        setTimeout(() => {
          bar.style.width = target + '%';
        }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });
  
  bars.forEach(bar => observer.observe(bar));
}

// ===== MODAL =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    modal.querySelector('.modal-close')?.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  searchInput.addEventListener('input', debounce((e) => {
    const query = e.target.value.toLowerCase();
    // Implement search logic here
    console.log('Searching for:', query);
  }, 300));
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== LAZY LOADING =====
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });
  
  images.forEach(img => observer.observe(img));
}

// ===== SCROLL REVEAL (Intersection Observer) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach(el => {
  revealObserver.observe(el);
});

// ===== SCROLL PROGRESS BAR =====
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / scrollHeight) * 100;
  document.getElementById('scrollProgress').style.width = progress + '%';

  // Back to top button
  const btn = document.getElementById('backToTop');
  if (scrollTop > 400) {
    btn.classList.remove('opacity-0', 'invisible');
    btn.classList.add('opacity-100', 'visible');
  } else {
    btn.classList.add('opacity-0', 'invisible');
    btn.classList.remove('opacity-100', 'visible');
  }
});

// ===== CURSOR TRAIL (Optimized with requestAnimationFrame) =====
const dot = document.getElementById('cursorDot');
let dotX = 0, dotY = 0;
let animationFrameId = null;

function updateCursor() {
  dot.style.left = dotX + 'px';
  dot.style.top = dotY + 'px';
  animationFrameId = null;
}

document.addEventListener('mousemove', (e) => {
  dot.classList.remove('hidden');
  dotX = e.clientX;
  dotY = e.clientY;
  if (!animationFrameId) {
    animationFrameId = requestAnimationFrame(updateCursor);
  }
});
document.addEventListener('mouseleave', () => { dot.classList.add('hidden'); });

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== KEYBOARD SUPPORT =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeContactModal();
    closeLightbox();
    document.querySelectorAll('.modal-backdrop.active').forEach(modal => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});

// ===== INITIALIZE ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initAccordions();
  initTabs();
  initDropdowns();
  initCookieConsent();
  initLightbox();
  initTestimonialCarousel();
  initFormValidation();
  initStatsCounter();
  initNewsletter();
  initProgressBars();
  initModals();
  initSearch();
  initLazyLoading();
});
