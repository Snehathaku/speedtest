const aboutSection = document.querySelector('.about');
aboutSection.style.opacity = 0;

window.addEventListener('load', () => {
  let opacity = 0;
  const fadeIn = setInterval(() => {
    if (opacity < 1) {
      opacity += 0.1;
      aboutSection.style.opacity = opacity;
    } else {
      clearInterval(fadeIn);
    }
  }, 100);
});