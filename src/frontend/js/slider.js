var joinSlider = new Swiper(".joinRef__slider", {
  slidesPerView: 1,
  loop: true,
  speed: 600,
  grabCursor: true,
  effect: "creative",
  creativeEffect: {
    prev: {
      origin: "left center",
      translate: ["-12%", 0, -300],
    },
    next: {
      origin: "right center",
      translate: ["12%", 0, -300],
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
