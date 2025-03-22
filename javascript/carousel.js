// Swipe card
const carouselWrapper = document.querySelector(".video-carousel-wrapper");
const carousel = document.querySelector(".video-carousel");
const prevButton = document.querySelector(
  '.video-nav-buttons[aria-label="Previous Videos"]'
);
const nextButton = document.querySelector(
  '.video-nav-buttons[aria-label="Next Videos"]'
);
const slider = document.querySelector(".slider-div input"); // Get the range slider

const imageWidth = 300; // The width of each image in pixels
const imageMargin = 5; // The margin between each image (left and right)
const totalItems = carousel.children.length; // The number of images in the carousel

let startX;
let scrollLeft;
let isMouseDown = false; // Track whether the mouse is pressed or not

// Mouse Down Event for Swiping
carouselWrapper.addEventListener("mousedown", (e) => {
  startX = e.pageX - carouselWrapper.offsetLeft;
  scrollLeft = carouselWrapper.scrollLeft;
  isMouseDown = true; // Mouse is pressed, start grabbing
  carouselWrapper.style.cursor = "grabbing";
  e.preventDefault();
});

// Mouse Leave Event
carouselWrapper.addEventListener("mouseleave", () => {
  if (isMouseDown) {
    isMouseDown = false;
    carouselWrapper.style.cursor = "grab"; // Reset cursor
  }
});

// Mouse Up Event to stop grabbing
carouselWrapper.addEventListener("mouseup", () => {
  isMouseDown = false; // Mouse is no longer pressed, stop grabbing
  carouselWrapper.style.cursor = "grab"; // Reset cursor
});

// Mouse Move Event for Swiping
carouselWrapper.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return; // Only move when mouse is pressed down

  const x = e.pageX - carouselWrapper.offsetLeft;
  const walk = (x - startX) * 3; // Adjust scroll speed as needed
  carouselWrapper.scrollLeft = scrollLeft - walk;
});

// Click Event for Previous Button
prevButton.addEventListener("click", () => {
  carouselWrapper.scrollLeft -= imageWidth; // Scroll left by one image width
});

// Click Event for Next Button
nextButton.addEventListener("click", () => {
  carouselWrapper.scrollLeft += imageWidth; // Scroll right by one image width
});

// Sync range slider with carousel scroll position
slider.addEventListener("input", () => {
  const maxScroll = (imageWidth + imageMargin * 2) * (totalItems - 1); // Max scroll position based on total images and image margin
  const sliderValue = slider.value;
  const newScrollLeft = (sliderValue / 100) * maxScroll;
  carouselWrapper.scrollLeft = newScrollLeft;
});

// Sync carousel scroll position with range slider
carouselWrapper.addEventListener("scroll", () => {
  const maxScroll = (imageWidth + imageMargin * 2) * (totalItems - 1); // Correct the scrollable area
  const scrollPercentage = (carouselWrapper.scrollLeft / maxScroll) * 100;
  slider.value = scrollPercentage; // Update slider based on current scroll position
});
