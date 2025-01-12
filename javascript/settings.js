// Buttons
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");
const SOUND_ON_BUTTON = document.getElementById("on");
const SOUND_OFF_BUTTON = document.getElementById("off");

// Small Text
TEXT_SMALL_BUTTON.addEventListener("click", function () {
  TEXT_SMALL_BUTTON.setAttribute("class", "settings-buttons-active");
  TEXT_MEDIUM_BUTTON.setAttribute("class", "settings-buttons");
  TEXT_LARGE_BUTTON.setAttribute("class", "settings-buttons");
  document.body.style.fontSize = "0.9em";
});

// Medium Text
TEXT_MEDIUM_BUTTON.addEventListener("click", function () {
  TEXT_SMALL_BUTTON.setAttribute("class", "settings-buttons");
  TEXT_MEDIUM_BUTTON.setAttribute("class", "settings-buttons-active");
  TEXT_LARGE_BUTTON.setAttribute("class", "settings-buttons");
  document.body.style.fontSize = "1em";
});

// Large Text
TEXT_LARGE_BUTTON.addEventListener("click", function () {
  TEXT_SMALL_BUTTON.setAttribute("class", "settings-buttons");
  TEXT_MEDIUM_BUTTON.setAttribute("class", "settings-buttons");
  TEXT_LARGE_BUTTON.setAttribute("class", "settings-buttons-active");
  document.body.style.fontSize = "1.1em";
});

let background_music = new Audio("../sounds/background_music.mp3");
let sound_on = false;

// Sound On
SOUND_ON_BUTTON.addEventListener("click", function () {
  SOUND_ON_BUTTON.setAttribute("class", "settings-buttons-active");
  SOUND_OFF_BUTTON.setAttribute("class", "settings-buttons");
  // Play Bg music
  background_music.play();
  // Sound on variable
  sound_on = true;
});

// Sound Off
SOUND_OFF_BUTTON.addEventListener("click", function () {
  SOUND_ON_BUTTON.setAttribute("class", "settings-buttons");
  SOUND_OFF_BUTTON.setAttribute("class", "settings-buttons-active");
  // Stop Bg music
  background_music.pause();
  // Sound on variable
  sound_on = false;
});
