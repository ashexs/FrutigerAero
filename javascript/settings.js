// ---------
// BUTTONS
// ---------

// Get references to text size buttons
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");

// Get references to sound buttons
const SOUND_ON_BUTTON = document.getElementById("on");
const SOUND_OFF_BUTTON = document.getElementById("off");

// ---------
// TEXT SIZE
// ---------

// Variable to hold selected font size
let font_size = "1em";

// Function to set a cookie with a specified name and value
function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/"; // Set the cookie with path=/ for accessibility across pages
}

// Function to get a cookie value by name
function getCookie(name) {
  let nameEQ = name + "="; // Create the prefix to search for
  let ca = document.cookie.split(";"); // Split cookies by semicolon into an array
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim(); // Trim whitespace from each cookie string
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length); // Return the value if name matches
    }
  }
  return null; // Return null if cookie not found
}

// Function to set the active button and reset others
function setActiveButton(activeButton, otherButtons) {
  activeButton.setAttribute("class", "settings-buttons-active"); // Set active button class
  otherButtons.forEach(
    (button) => button.setAttribute("class", "settings-buttons-inactive") // Reset class for other buttons
  );
}

// On page load, read the saved font size and button state from cookies
window.addEventListener("load", function () {
  let savedFontSize = getCookie("font_size"); // Get saved font size from cookie
  let savedButton = getCookie("active_button"); // Get saved active button from cookie

  if (savedFontSize && savedButton) {
    document.body.style.fontSize = savedFontSize; // Apply saved font size to body

    // Apply the correct button state based on saved button
    switch (savedButton) {
      case "small":
        setActiveButton(TEXT_SMALL_BUTTON, [
          TEXT_MEDIUM_BUTTON,
          TEXT_LARGE_BUTTON,
        ]);
        break;
      case "medium":
        setActiveButton(TEXT_MEDIUM_BUTTON, [
          TEXT_SMALL_BUTTON,
          TEXT_LARGE_BUTTON,
        ]);
        break;
      case "large":
        setActiveButton(TEXT_LARGE_BUTTON, [
          TEXT_SMALL_BUTTON,
          TEXT_MEDIUM_BUTTON,
        ]);
        break;
    }
  }
});

// Add event listener for Small Text button click
TEXT_SMALL_BUTTON.addEventListener("click", function () {
  setActiveButton(TEXT_SMALL_BUTTON, [TEXT_MEDIUM_BUTTON, TEXT_LARGE_BUTTON]); // Set active button and reset others
  font_size = "0.9em"; // Set font size
  document.body.style.fontSize = font_size; // Apply font size to body
  setCookie("font_size", font_size); // Save font size in cookie
  setCookie("active_button", "small"); // Save active button in cookie
});

// Add event listener for Medium Text button click
TEXT_MEDIUM_BUTTON.addEventListener("click", function () {
  setActiveButton(TEXT_MEDIUM_BUTTON, [TEXT_SMALL_BUTTON, TEXT_LARGE_BUTTON]); // Set active button and reset others
  font_size = "1em"; // Set font size
  document.body.style.fontSize = font_size; // Apply font size to body
  setCookie("font_size", font_size); // Save font size in cookie
  setCookie("active_button", "medium"); // Save active button in cookie
});

// Add event listener for Large Text button click
TEXT_LARGE_BUTTON.addEventListener("click", function () {
  setActiveButton(TEXT_LARGE_BUTTON, [TEXT_SMALL_BUTTON, TEXT_MEDIUM_BUTTON]); // Set active button and reset others
  font_size = "1.1em"; // Set font size
  document.body.style.fontSize = font_size; // Apply font size to body
  setCookie("font_size", font_size); // Save font size in cookie
  setCookie("active_button", "large"); // Save active button in cookie
});

// ------
// SOUNDS
// ------

// Create an audio object for background music
let background_music = new Audio("../sounds/background_music.mp3");

// Variable to track sound state
let sound_on = false;

// On page load, read saved sound state and music time
window.addEventListener("load", function () {
  let savedSound = getCookie("sound"); // Get saved sound state from cookie
  let savedTime = localStorage.getItem("music_time"); // Get saved music time from localStorage

  if (savedTime) {
    background_music.currentTime = parseFloat(savedTime); // Set music time if saved time exists
  }

  if (savedSound) {
    if (savedSound === "on") {
      setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true); // Set active sound button for "on"
      background_music.play(); // Play background music
    } else if (savedSound === "off") {
      setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false); // Set active sound button for "off"
      background_music.pause(); // Pause background music
    }
  }
});

// Add event listener for Sound On button click
SOUND_ON_BUTTON.addEventListener("click", function () {
  setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true); // Set active sound button for "on"
  background_music.play(); // Play background music
  setCookie("sound", "on"); // Save sound state in cookie for
});

// Add event listener for Sound Off button click
SOUND_OFF_BUTTON.addEventListener("click", function () {
  setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false); // Set active sound button for "off"
  background_music.pause(); // Pause background music
  setCookie("sound", "off"); // Save sound state in cookie
});

// Function to set the active sound button and reset the other
function setActiveSound(activeButton, inactiveButton, isSoundOn) {
  activeButton.setAttribute("class", "settings-buttons-active"); // Set active button class
  inactiveButton.setAttribute("class", "settings-buttons-inactive"); // Reset inactive button class
  sound_on = isSoundOn; // Update sound state variable
}

// Add event listener to save current music time periodically
background_music.addEventListener("timeupdate", function () {
  localStorage.setItem("music_time", background_music.currentTime); // Save current music time in localStorage
});
