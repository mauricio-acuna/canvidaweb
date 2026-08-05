document.addEventListener('DOMContentLoaded', () => {
  const year = new Date().getFullYear();
  const footerText = document.querySelector('.footer-inner span');
  if (footerText) {
    footerText.textContent = `© ${year} MA Consultoría Digital`;
  }
});
