const currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerHTML = 'Last Modified, ';
const lastModifieDate = document.lastModified;
document.getElementById("lastModified").innerHTML = lastModifieDate;


const lastModified = new Date(document.lastModified);
const options = { year: 'numeric', month: 'long', day: 'numeric'};
document.getElementById('lastModified').textContent = lastModified.toLocaleDateString('en-Us', options)