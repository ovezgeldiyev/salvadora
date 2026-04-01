var referenceSlider = new Swiper(".reference__inner-slider", {
  slidesPerView: 3,
  loop: false,
  speed: 600,
  navigation: {
    nextEl: ".reference .swiper-button-next",
    prevEl: ".reference .swiper-button-prev",
  },
  breakpoints: {
    200: {
      slidesPerView: 1.05,
    },
    650: {
      slidesPerView: 2,
    },
    930: {
      slidesPerView: 3,
    },
  },
});
var newsSlider = new Swiper(".news__inner-slider", {
  slidesPerView: 2,
  loop: false,
  speed: 600,
  navigation: {
    nextEl: ".news .swiper-button-next",
    prevEl: ".news .swiper-button-prev",
  },
  breakpoints: {
    200: {
      slidesPerView: 1.05,
    },
    650: {
      slidesPerView: 2,
    },
  },
});

var newsSlider = new Swiper(".joinRef__slider", {
  slidesPerView: 1,
  loop: true,
  effect: "fade",
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
