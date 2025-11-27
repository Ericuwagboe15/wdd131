const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
   
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple7.jpg"
  
      },

  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-7149.jpg"
     },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/johannesburg-south-africa-temple/johannesburg-south-africa-temple-22456.jpg"
    },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "1978, October, 30",
    area: 59436,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/sao-paulo-brazil-temple/sao-paulo-brazil-temple-55945.jpg"
    },
    {
      templeName: "Tokyo Japan",
      location: "Tokyo, Japan",
      dedicated: "1980, October, 27",
      area: 53500,
      imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-8154.jpg"
    }
];

const container = document.querySelector("#temples");

 temples.forEach(temples => {
  const card = document.createElement("div");
  card.classList.add("temples");

  card.innerHTML = `<h2>${temples.templeName}</h2>
  <img src="${temples.imageUrl}" alt="${temples.templeName}" loading="lazy" 
  <p><strong>Location:</strong>${temples.location}</p>
   <p><strong>Dedicated:</strong>${temples.dedicated}</p>
    <p><strong>Area:</strong>${temples.area.toLocaleString()} sq ft</p>`;

    container.appendChild(card);
});

const lastModified = new Date(document.lastModified);
const options = { year: "numeric" , month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
document.getElementById("lastModified").innerHTML = "Last Modified " + lastModified.toLocaleString("en-us", options)