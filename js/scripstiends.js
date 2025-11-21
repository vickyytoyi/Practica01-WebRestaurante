// Mensaje de prueba
console.log("Hello world!");

document.addEventListener("DOMContentLoaded", function () {


  /* ===== Swiper: inicialización para múltiples carousels ===== */
  if (typeof Swiper !== 'undefined') {
    const collectionSwipers = document.querySelectorAll('.collection-swiper');
    if (collectionSwipers.length) {
      collectionSwipers.forEach(el => {
        new Swiper(el, {
          slidesPerView: 3,
          spaceBetween: 24,
          loop: false,
          centeredSlides: false,
          pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
          breakpoints: {
            0: { slidesPerView: 1, spaceBetween: 12 },
            576: { slidesPerView: 2, spaceBetween: 16 },
            992: { slidesPerView: 3, spaceBetween: 24 }
          }
        });
      });
    }

    const featuredSwiperEl = document.querySelector(".myFeaturedSwiper");
    if (featuredSwiperEl) {
      new Swiper(featuredSwiperEl, {
        loop: true,
        autoplay: { delay: 2800, disableOnInteraction: false },
        speed: 1200,
        effect: "fade",
        fadeEffect: { crossFade: true },
        pagination: { el: ".swiper-pagination", clickable: true }
      });
    }
  }

  /* ===== Carrito: añadir, renderizar y actualizar offcanvas ===== */
  const cart = {}; // { id: { id, name, price, qty } }
  const cartCountEl = document.getElementById('cartCount');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');

  function formatCurrency(v) {
    return '€' + Number(v).toFixed(2);
  }

  function updateCartUI() {
    const totalQty = Object.values(cart).reduce((s, i) => s + i.qty, 0);
    if (cartCountEl) cartCountEl.textContent = totalQty;

    if (cartItemsEl) {
      cartItemsEl.innerHTML = '';
      if (totalQty === 0) {
        cartItemsEl.innerHTML = '<p class="text-muted">Tu carrito está vacío.</p>';
      } else {
        Object.values(cart).forEach(item => {
          const div = document.createElement('div');
          div.className = 'd-flex align-items-center mb-3';
          div.innerHTML = `
            <div class="me-3">
              <div style="width:56px;height:56px;background:#f0f0f0;border-radius:6px;display:flex;align-items:center;justify-content:center;">
                <i class="bi bi-box-seam"></i>
              </div>
            </div>
            <div class="flex-grow-1">
              <div class="small fw-bold">${item.name}</div>
              <div class="small text-muted">${formatCurrency(item.price)} × ${item.qty}</div>
            </div>
            <div class="text-end">
              <div class="small fw-bold">${formatCurrency(item.price * item.qty)}</div>
            </div>
          `;
          cartItemsEl.appendChild(div);
        });
      }
    }

    const totalPrice = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);
    if (cartTotalEl) cartTotalEl.textContent = formatCurrency(totalPrice);
  }

  document.body.addEventListener('click', function (e) {
    const btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    const id = btn.dataset.id || ('prod-' + Date.now());
    const name = btn.dataset.name || btn.getAttribute('aria-label') || 'Producto';
    const price = parseFloat(btn.dataset.price || '0');

    if (!cart[id]) cart[id] = { id, name, price, qty: 0 };
    cart[id].qty += 1;

    btn.classList.add('btn-added');
    setTimeout(() => btn.classList.remove('btn-added'), 450);

    updateCartUI();

    const offCanvasEl = document.getElementById('cartOffcanvas');
    if (offCanvasEl) {
      const bsOff = bootstrap.Offcanvas.getOrCreateInstance(offCanvasEl);
      bsOff.show();
    }
  });

  updateCartUI();

  /* ===== IntersectionObserver ligero para Swiper ===== */
  const swipersToObserve = document.querySelectorAll('.collection-swiper');
  if (swipersToObserve.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const s = entry.target.swiper;
          if (s) s.update();
        }
      });
    }, { threshold: 0.25 });
    swipersToObserve.forEach(el => io.observe(el));
  }

});

    
  