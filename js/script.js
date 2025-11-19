console.log("Hello world!");

// SCROLL REVEAL JS
ScrollReveal().reveal(".grid-wrapper > div", {
    delay: 200,
    distance: "50px",
    interval: 100,
    origin: "bottom",
    scale: 0.9,
});















// SCRIPT DE TIENDA

const PRODUCTS=[
    {id:1,title:'Postre Tarta de Surtidos',price:28,img:'assets/product1.jpg',description:'Tarta creada por los hermanos Roca.'},
    {id:2,title:'Libro: Sabores de Can Roca',price:45,img:'assets/product2.jpg',description:'Edición de colección con recetas.'},
    {id:3,title:'Caja de Dulces',price:22.5,img:'assets/product3.jpg',description:'Selección exclusiva.'},
    {id:4,title:'Merch — Delantal',price:39,img:'assets/product4.jpg',description:'Delantal premium.'},
    {id:5,title:'Pack Regalo Gourmet',price:85,img:'assets/product5.jpg',description:'Selección fantástica.'}
];
  
let displayed=4;
let cart=JSON.parse(localStorage.getItem('cdr_cart')||'{}');
  
function formatPrice(v){return '€'+v.toFixed(2);};

// REVEAL: efecto simple vía IntersectionObserver 
let revealObserver;
function observeReveals(){
const reveals = document.querySelectorAll('.reveal');
    if(!revealObserver){
revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('active'); }
});
}, { threshold: 0.12 });
}
     reveals.forEach(r=>revealObserver.observe(r));
}
 
// iniciar observador en carga
document.addEventListener('DOMContentLoaded', () => observeReveals());
 