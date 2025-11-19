// SCRIPT DE TIENDA
console.log("Hello world!");

/* --- SWIPER --- */
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: { el: ".swiper-pagination", clickable: true },
    breakpoints: {
        768: { slidesPerView: 3 },
        1200: { slidesPerView: 4 }
    }
});


/* --- GSAP PARALLAX SUAVE --- */
gsap.utils.toArray('.editorial-img img').forEach(img => {
    gsap.to(img, {
        y: -40,
        ease: "none",
        scrollTrigger: {
            trigger: img,
            start: "top bottom",
            scrub: true
        }
    });
});

// ANIMACIÓN REVEAL CON INTERSECTION OBSERVER
function initReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // evita repetir animaciones
            }
        })
    }, {threshold: 0.15 });

    reveals.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    initReveal();
});