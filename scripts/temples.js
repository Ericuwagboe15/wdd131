const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

//const lastModified = new Date(document.lastModified);
//const options = {year: 'numeric', month: 'long', day: 'numeric', time: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
//document.getElementById('lastModified').innerHTML = 'Last Modified: ' + lastModified.toLocaleString('en-Us', options)






const lastModified = new Date(document.lastModified);
const options = { year: "numeric"};
document.getElementById("lastModified").innerHTML = "last modified " + lastModified.toLocaleString("en-us", options)
