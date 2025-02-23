// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    themeToggle.textContent = '☀️Light Mode';
    localStorage.setItem('theme', 'dark-mode');
  } else {
    themeToggle.textContent = '🌙Dark Mode';
    localStorage.setItem('theme', '☀️light-mode');
  }
});

// Check saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === '🌙dark-mode') {
  body.classList.add('dark-mode');
  themeToggle.textContent = 'Light Mode';
}