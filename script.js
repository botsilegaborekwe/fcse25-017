const navbarLinks = document.querySelectorAll(".nav-menu .nav-link");
const dropdownToggles = document.querySelectorAll(".nav-dropdown .dropdown-toggle");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

if (menuOpenButton && menuCloseButton) {
  menuOpenButton.addEventListener("click", () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
  });
  // Close menu when the close button is clicked
  menuCloseButton.addEventListener("click", () => menuOpenButton.click());
  // Close menu when nav link is clicked (but not dropdown toggle)
  navbarLinks.forEach((link) => {
    if (!link.classList.contains("dropdown-toggle")) {
      link.addEventListener("click", () => {
        if (document.body.classList.contains("show-mobile-menu")) {
          menuOpenButton.click();
        }
      });
    }
  });
  
  // Handle dropdown toggle on mobile
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const dropdown = toggle.closest(".nav-dropdown");
      const dropdownMenu = dropdown.querySelector(".dropdown-menu");
      dropdownMenu.classList.toggle("show");
    });
  });
}
/* Initializing Swiper */
const sliderElement = document.querySelector(".slider-container");
if (window.Swiper && sliderElement) {
  new Swiper(".slider-container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
    // Pagination bullets
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    /* Responsive breakpoints */
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

const policyLinks = document.querySelectorAll(".policy-link");
if (policyLinks.length > 0) {
  const policyModal = document.createElement("div");
  policyModal.className = "policy-modal";
  policyModal.innerHTML = `
    <div class="policy-modal__content">
      <div class="policy-modal__header">
        <h2 class="policy-modal__title"></h2>
        <button class="policy-modal__close" aria-label="Close policy details">&times;</button>
      </div>
      <div class="policy-modal__body"></div>
    </div>
  `;
  document.body.appendChild(policyModal);

  const modalTitle = policyModal.querySelector(".policy-modal__title");
  const modalBody = policyModal.querySelector(".policy-modal__body");
  const closeModalButton = policyModal.querySelector(".policy-modal__close");

  const policyText = {
    privacy: `
      <p>We respect your privacy. Any information collected through this website is used only to improve your experience and fulfill your orders.</p>
      <p>We do not share your personal details with third parties unless required by law. Your contact and payment information remain secure and confidential.</p>
      <p>If you have questions about how we handle data, please contact us through the contact page.</p>
    `,
    refund: `
      <p>Refunds are available for eligible orders when the product is damaged, incorrect, or not delivered as expected.</p>
      <p>Please reach out within 14 days of delivery to request a refund. We will review your request and respond as quickly as possible.</p>
      <p>Once approved, refunds will be processed using the original payment method.</p>
    `
  };

  function openPolicy(type) {
    modalTitle.textContent = type === "privacy" ? "Privacy Policy" : "Refund Policy";
    modalBody.innerHTML = policyText[type] || "";
    policyModal.classList.add("open");
    document.body.classList.add("modal-open");
  }

  function closePolicy() {
    policyModal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  policyLinks.forEach(link => {
    const type = link.dataset.policy || (link.textContent.toLowerCase().includes("refund") ? "refund" : "privacy");
    link.dataset.policy = type;
    link.addEventListener("click", event => {
      event.preventDefault();
      openPolicy(type);
    });
  });

  closeModalButton.addEventListener("click", closePolicy);
  policyModal.addEventListener("click", event => {
    if (event.target === policyModal) {
      closePolicy();
    }
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && policyModal.classList.contains("open")) {
      closePolicy();
    }
  });
}

// Back to top button
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }

  document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Open location dropdown if hash is #location
if (window.location.hash === '#location') {
  const details = document.getElementById('location');
  if (details) details.open = true;
}

// Show testimonials if hash is #testimonials
if (window.location.hash === '#testimonials') {
  const testimonialsSection = document.getElementById('testimonials');
  if (testimonialsSection) testimonialsSection.classList.add('show');
}

// Testimonials toggle
const toggleButton = document.getElementById('testimonials-toggle');
const testimonialsSection = document.getElementById('testimonials');
if (toggleButton && testimonialsSection) {
  toggleButton.addEventListener('click', () => {
    testimonialsSection.classList.toggle('show');
    toggleButton.textContent = testimonialsSection.classList.contains('show') ? 'Hide Testimonials' : 'View Testimonials';
  });
}

// Feedback form submission handler
const feedbackForm = document.querySelector('.feedback-form');
if (feedbackForm) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'feedback-success-message';
    successMessage.innerHTML = `
      <div class="success-content">
        <i class="fas fa-check-circle"></i>
        <h3>Feedback Submitted Successfully!</h3>
        <p>Thank you for your feedback. We appreciate your input!</p>
      </div>
    `;
    
    // Add to page
    document.body.appendChild(successMessage);
    
    // Trigger animation
    setTimeout(() => successMessage.classList.add('show'), 10);
    
    // Reset form
    feedbackForm.reset();
    
    // Remove message after 4 seconds
    setTimeout(() => {
      successMessage.classList.remove('show');
      setTimeout(() => successMessage.remove(), 300);
    }, 4000);
  });
}
