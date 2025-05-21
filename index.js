// Generate stars
document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars-container');
  const starCount = 50;

  function randomRange(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.setProperty('--star-tail-length', `${randomRange(500, 750) / 100}em`);
    star.style.setProperty('--top-offset', `${randomRange(0, 10000) / 100}vh`);
    star.style.setProperty('--fall-duration', `${randomRange(6000, 12000) / 1000}s`);
    star.style.setProperty('--fall-delay', `${randomRange(0, 10000) / 1000}s`);
    starsContainer.appendChild(star);
  }
});

// Custom cursor
document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('custom-cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Intersection Observer for scrolling animations
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(section => {
  observer.observe(section);
});
