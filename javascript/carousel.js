const CAROUSEL_WRAPPER = document.querySelector(".video-carousel-wrapper");
const CAROUSEL = document.querySelector(".video-carousel");
const PREV_BUTTON = document.querySelector(
  '.video-nav-buttons[aria-label="Previous Videos"]'
);
const NEXT_BUTTON = document.querySelector(
  '.video-nav-buttons[aria-label="Next Videos"]'
);

const IMAGE_WIDTH = 640;
const IMAGE_MARGIN = 5;
const TOTAL_ITEMS = CAROUSEL.children.length;

let startX;
let scrollLeft;
let isMouseDown = false;

CAROUSEL_WRAPPER.addEventListener("mousedown", (e) => {
  startX = e.pageX - CAROUSEL_WRAPPER.offsetLeft;
  scrollLeft = CAROUSEL_WRAPPER.scrollLeft;
  isMouseDown = true;
  e.preventDefault();
});

CAROUSEL_WRAPPER.addEventListener("mouseleave", () => {
  if (isMouseDown) {
    isMouseDown = false;
  }
});

CAROUSEL_WRAPPER.addEventListener("mouseup", () => {
  isMouseDown = false;
});

CAROUSEL_WRAPPER.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  const x = e.pageX - CAROUSEL_WRAPPER.offsetLeft;
  const walk = (x - startX) * 3;
  CAROUSEL_WRAPPER.scrollLeft = scrollLeft - walk;
});

PREV_BUTTON.addEventListener("click", () => {
  CAROUSEL_WRAPPER.scrollLeft -= IMAGE_WIDTH;
});

NEXT_BUTTON.addEventListener("click", () => {
  CAROUSEL_WRAPPER.scrollLeft += IMAGE_WIDTH;
});
