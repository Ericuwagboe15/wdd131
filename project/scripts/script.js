const menu=[
{id:1,name:'Jollof Rice & Chicken',price:1200,img:'images/jollof.webp'},
{id:2,name:'Egusi Soup & Pounded Yam',price:1500,img:'images/egusi.webp'},
{id:3,name:'Fried Plantain & Fish',price:900,img:'images/plantain.webp'}
];


const output=document.getElementById('menuItems');
const orderSummary=document.getElementById('orderSummary');
let cart=JSON.parse(localStorage.getItem('ericasCart'))||[];


function displayMenu(){
if(!output) return;
output.innerHTML=menu.map(item=>`
<div class="card">
<img src="${item.img}" alt="${item.name}" loading="lazy">
<h3>${item.name}</h3>
<p>₦${item.price}</p>
<button class="btn" onclick="addToCart(${item.id})">Add to Order</button>
</div>`).join('');
}


function addToCart(id){
cart.push(id);
localStorage.setItem('ericasCart',JSON.stringify(cart));
renderOrder();
}


function renderOrder(){
if(!orderSummary) return;
const items=cart.map(i=>menu.find(m=>m.id===i));
orderSummary.innerHTML=items.map(i=>`<p>${i.name} - ₦${i.price}</p>`).join('');
}


document.getElementById('year')&&(document.getElementById('year').textContent=new Date().getFullYear());
document.getElementById('year2')&&(document.getElementById('year2').textContent=new Date().getFullYear());
document.getElementById('year3')&&(document.getElementById('year3').textContent=new Date().getFullYear());
displayMenu();renderOrder();