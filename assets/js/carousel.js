(() => {
  const carousel = document.getElementById('carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  if (!track || !slides.length) return;

  const setActive = (dot) => {
    dots.forEach(d => {
      d.classList.toggle('active', d === dot);
      d.setAttribute('aria-selected', d === dot ? 'true' : 'false');
    });
  };

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slide = document.getElementById('carousel-slide-' + dot.dataset.slide);
      if (slide) {
        track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
        setActive(dot);
      }
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const i = entry.target.id.replace('carousel-slide-', '');
        const dot = carousel.querySelector('.carousel-dot[data-slide="' + i + '"]');
        if (dot) setActive(dot);
      }
    });
  }, { root: track, threshold: 0.6 });
  slides.forEach(s => observer.observe(s));
})();
