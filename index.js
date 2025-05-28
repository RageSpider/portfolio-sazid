document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars-container');
  const linesContainer = document.getElementById('lines-container');
  const starCount = 50; // Reduced for cleaner look
  const lineCount = 5;

  function randomRange(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  // Generate stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${randomRange(0, 100)}%`;
    star.style.top = `${randomRange(0, 100)}%`;
    star.style.animationDelay = `${randomRange(0, 5000) / 1000}s`;
    starsContainer.appendChild(star);
  }

  // Generate lines
  for (let i = 0; i < lineCount; i++) {
    const line = document.createElement('div');
    line.className = 'line';
    line.style.left = `${randomRange(10, 90)}%`;
    line.style.setProperty('--animation-delay', `${randomRange(0, 4000) / 1000}s`);
    linesContainer.appendChild(line);
  }

  // Intersection Observer for scrolling animations
  const sections = document.querySelectorAll('section');
  const cards = document.querySelectorAll('.card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cards.forEach(card => {
          card.style.animationDelay = card.dataset.delay || '0s';
        });
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });
});