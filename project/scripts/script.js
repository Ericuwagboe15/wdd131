const lastModified = new Date(document.lastModified);
const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"};
document.getElementById("lastModified").innerHTML = "Last Modified " + lastModified.toLocaleString("en-us",options);

const foods = [
    {   
        
        foodName: "Jollof Rice",
        paragrah: "Jollof rice is a popular West African dish made with rice, tomatoes, onions, and a variety of spices. It is often served with fried plantains and grilled chicken or fish.",
        imageUrl: "https://tse4.mm.bing.net/th/id/OIP.R7QyoGLSRR5urBtfXh8BbAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        foodName: "Fried Rice",
        paragrah: "Fried rice is a dish of cooked rice that has been stir-fried in a wok or frying pan and is usually mixed with other ingredients such as eggs, vegetables, seafood, or meat.",
        imageUrl: "https://tse3.mm.bing.net/th/id/OIP.ug7mcOMWDCGNYWMVONgcgwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        foodName: "Pounded Yam and Egusi Soup",
        paragrah: "Pounded yam is a traditional Nigerian dish made by boiling yams and then pounding them into a smooth, stretchy dough. It is often served with egusi soup, which is made from melon seeds, vegetables, and meat or fish.",
        imageUrl: "https://th.bing.com/th/id/R.18ce621db86cb911138147739609041c?rik=4Oa8w%2fF3T64lQA&pid=ImgRaw&r=0"
    },
    {
        foodName: "Suya(Spicy Grilled Meat)",
        paragrah: "Suya is a popular Nigerian street food made from skewered and grilled meat, typically beef or chicken, that has been marinated in a spicy peanut sauce. It is often served with sliced onions and tomatoes.",
        imageUrl: "https://th.bing.com/th/id/R.b76cf103576b900476def21823b03210?rik=%2bw%2flPp1LDZwX4g&riu=http%3a%2f%2fsisijemimah.com%2fwp-content%2fuploads%2f2017%2f02%2fNigerian-suya-recipe.jpg&ehk=ZVYnAH41tldG69OOpvlXobeaWsFzDlc65x3ji5MIUtY%3d&risl=&pid=ImgRaw&r=0"
    }
];

const container = document.querySelector("#foods");

 foods.forEach(foods => {
  const menu = document.createElement("div");
  menu.classList.add("foods");

  menu.innerHTML = `<h2>${foods.foodName}</h2>
  <img src="${foods.imageUrl}" alt="${foods.foodName}" loading="lazy" 
   <p><strong>Meal:</strong>${foods.paragrah}</p>`;


    container.appendChild(menu);
});

