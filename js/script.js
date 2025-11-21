console.log("Hello world!");

// SCROLL REVEAL JS
ScrollReveal().reveal(".grid-wrapper > div", {
    delay: 200,
    distance: "50px",
    interval: 100,
    origin: "bottom",
    scale: 0.9,
});

// Calendario de la sección Reservas
$( function() {
    $( "#datepicker" ).datepicker();
  } );

  var typed6 = new Typed("#typed-text", {
    strings: [
        "¿Tienes alguna duda?",
        "Revisa nuestra sección FAQs o...",
        "Entra en contacto con nosotros!",
    ],
    typeSpeed: 80,
    backSpeed: 40,
    loop: true,
});


 