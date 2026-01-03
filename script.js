// testimonial slider
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector("#testimonials .overflow-x-auto");
  const slides = slider.children;
  const prevBtn = document.querySelector(
    'button[aria-label="Previous testimonial"]'
  );
  const nextBtn = document.querySelector(
    'button[aria-label="Next testimonial"]'
  );
  const dots = document.querySelectorAll("#testimonials .h-2.w-2");

  let index = 0;
  const total = slides.length;

  function scrollToSlide(i) {
    index = (i + total) % total;
    slider.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth",
    });
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-primary", i === index);
      dot.classList.toggle("bg-gray-200", i !== index);
    });
  }

  nextBtn.addEventListener("click", () => scrollToSlide(index + 1));
  prevBtn.addEventListener("click", () => scrollToSlide(index - 1));

  // Autoplay
  let autoplay = setInterval(() => scrollToSlide(index + 1), 4000);

  // Pause on hover
  slider.parentElement.addEventListener("mouseenter", () =>
    clearInterval(autoplay)
  );
  slider.parentElement.addEventListener("mouseleave", () => {
    autoplay = setInterval(() => scrollToSlide(index + 1), 4000);
  });

  // Detect swipe/scroll
  slider.addEventListener("scroll", () => {
    const slideWidth = slides[0].offsetWidth;
    index = Math.round(slider.scrollLeft / slideWidth);
    updateDots();
  });

  updateDots();
});


// menu bar
// Mobile Menu Toggle - Optimized for tshering-wangchuk2002.github.io
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.md\\:hidden button');
  const header = document.querySelector('header');
  
  // Create mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.id = 'mobile-menu';
  mobileMenu.className = 'hidden md:hidden fixed inset-0 z-50 bg-white';
  mobileMenu.innerHTML = `
    <div class="flex flex-col h-full">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 border-b border-[#e7ebf3]">
        <div class="flex items-center gap-2">
          <div class="flex items-center justify-center rounded-lg bg-primary/10 p-1.5 text-primary">
            <span class="material-symbols-outlined">terminal</span>
          </div>
          <span class="text-lg font-bold tracking-tight text-[#0d121b]">Tshering</span>
        </div>
        <button id="close-menu" class="p-2 text-gray-600 hover:text-gray-900">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      
      <!-- Navigation Links -->
      <nav class="flex flex-col gap-2 p-4 overflow-y-auto">
        <a class="text-base font-medium text-[#4B5563] hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors" href="#work">Work</a>
        <a class="text-base font-medium text-[#4B5563] hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors" href="#services">Services</a>
        <a class="text-base font-medium text-[#4B5563] hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors" href="#about">About</a>
        <a class="text-base font-medium text-[#4B5563] hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors" href="#testimonials">Testimonials</a>
        <a class="text-base font-medium text-[#4B5563] hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors" href="#contact">Contact</a>
        
        <!-- Hire Me Button -->
        <a class="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 transition-all" href="#contact">
          Hire Me
        </a>
      </nav>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(mobileMenu);
  
  // Get elements
  const closeButton = document.getElementById('close-menu');
  const menuLinks = mobileMenu.querySelectorAll('a');
  
  // Toggle function
  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }
  
  // Open menu
  menuButton.addEventListener('click', () => toggleMenu(true));
  
  // Close menu
  closeButton.addEventListener('click', () => toggleMenu(false));
  
  // Close on link click
  menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
  
  // Close on outside click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      toggleMenu(false);
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMenu(false);
    }
  });
});
