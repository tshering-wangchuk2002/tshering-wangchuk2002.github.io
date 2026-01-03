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

// Scroll Effect
let currentScroll = 0;
let targetScroll = 0;
let ease = 0.08;

// Handle anchor links
window.addEventListener("hashchange", () => {
  const target = document.querySelector(window.location.hash);
  if (target) {
    targetScroll = target.offsetTop;
    currentScroll = window.scrollY; // Sync current position
  }
});

// Check for hash on page load
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    setTimeout(() => {
      targetScroll = target.offsetTop;
      currentScroll = target.offsetTop;
      window.scrollTo(0, currentScroll);
    }, 0);
  }
}

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    targetScroll += e.deltaY;
    targetScroll = Math.max(
      0,
      Math.min(targetScroll, document.body.scrollHeight - window.innerHeight)
    );
  },
  { passive: false }
);

function smoothScroll() {
  currentScroll += (targetScroll - currentScroll) * ease;
  window.scrollTo(0, currentScroll);
  requestAnimationFrame(smoothScroll);
}

smoothScroll();