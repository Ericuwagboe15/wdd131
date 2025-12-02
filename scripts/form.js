const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

const select = document.getElementById("product");

products.forEach(product => {
    const option = document.createElement("option");
    option.textContent = product.name;
    option.value = product.id;
    select.appendChild(option);
});

const lastModified = new Date(document.lastModified);
const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
document.getElementById("lastModified").innerHTML = "Last Modified " + lastModified.toLocaleString("en-us", options);