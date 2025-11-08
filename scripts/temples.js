const lastModified = new Date(document.lastModified);
const options = {year: 'numeric', month: 'long', day: 'numeric', time: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
document.getElementById('lastModified').innerHTML = 'Last Modified: ' + lastModified.toLocaleString('en-Us', options)

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
