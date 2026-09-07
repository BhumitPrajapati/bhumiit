// theme toggle — switches between dark/light and updates the button label
const themeBtn = document.getElementById('theme-toggle');
const bodyEl = document.body;

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const isDark = bodyEl.getAttribute('data-theme') === 'dark';
    bodyEl.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? 'Dark' : 'Light';
  });
}
