// ---------
// BUTTONS
// ---------

// Get references to text size buttons
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");

// Get references to sound buttons
const SOUND_ON_BUTTON = document.getElementById("soundsOn");
const SOUND_OFF_BUTTON = document.getElementById("soundsOff");

// Music bar
const MUSIC_BAR = document.getElementById("musicBar");
const MUSIC_TOGGLE_BUTTON = document.getElementById("musicToggle");
const MUSIC_TOGGLE_IMAGE = document.getElementById("musicToggleImg");
const SONG_TITLE = document.getElementById("songTitle");
const SONG_ARTIST = document.getElementById("songArtist");

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

// ------------------
// SOUNDS & MUSIC BAR
// ------------------

// Sounds toggle
let sound_on = false;

// Music Off by default
let music_playing = false;

// Hide music bar with delay
let isMusicBarVisible = false; // Track visibility state to prevent overlapping animations

// Function for hiding bar with fade animation
function musicBarHide() {
  if (!isMusicBarVisible) return; // Prevent multiple hide animations
  isMusicBarVisible = false;

  let op = 1; // initial opacity
  MUSIC_BAR.style.opacity = op; // ensure opacity starts at 1
  let timer = setInterval(function () {
    if (op <= 0) {
      clearInterval(timer);
      MUSIC_BAR.style.visibility = "hidden"; // hide element visually
      MUSIC_BAR.style.display = "none"; // remove from layout
    }
    op -= 0.5; // decrease opacity smoothly
    MUSIC_BAR.style.opacity = op;
    MUSIC_BAR.style.filter = "alpha(opacity=" + op * 100 + ")"; // IE fallback
  }, 50);
}

// Function for showing bar with fade animation
function musicBarShow() {
  if (isMusicBarVisible) return; // Prevent multiple show animations
  isMusicBarVisible = true;

  MUSIC_BAR.style.display = "flex"; // make element visible immediately
  MUSIC_BAR.style.visibility = "visible"; // ensure it's visually visible
  let op = 0; // initial opacity
  MUSIC_BAR.style.opacity = op; // ensure opacity starts at 0
  let timer = setInterval(function () {
    if (op >= 1) {
      clearInterval(timer);
    }
    op += 0.5; // increase opacity smoothly
    MUSIC_BAR.style.opacity = op;
    MUSIC_BAR.style.filter = "alpha(opacity=" + op * 100 + ")"; // IE fallback
  }, 50);
}

// Add event listener for Sound On button click
SOUND_ON_BUTTON.addEventListener("click", function () {
  setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true); // Set active sound button for "on"
  musicBarShow(); // Show music bar
  setCookie("sound", "on"); // Save sound state in cookie for
});

// Add event listener for Sound Off button click
SOUND_OFF_BUTTON.addEventListener("click", function () {
  setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false); // Set active sound button for "off"
  musicBarHide(); // Hide music bar
  setCookie("sound", "off"); // Save sound state in cookie
  musicOff();
});

// Function to set the active sound button and reset the other
function setActiveSound(activeButton, inactiveButton, isSoundOn) {
  activeButton.setAttribute("class", "settings-buttons-active"); // Set active button class
  inactiveButton.setAttribute("class", "settings-buttons-inactive"); // Reset inactive button class
  sound_on = isSoundOn; // Update sound state variable
}

// On page load, remember if sound bar is on
window.addEventListener("load", function () {
  let savedSound = getCookie("sound"); // Get saved sound state from cookie

  if (savedSound) {
    if (savedSound === "on") {
      setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true); // Set active sound button for "on"
      MUSIC_BAR.style.display = "flex"; // Show music bar
      isMusicBarVisible = true; // Music Bar visible
    } else if (savedSound === "off") {
      setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false); // Set active sound button for "off"
      MUSIC_BAR.style.display = "none"; // Hide music bar
      isMusicBarVisible = false; // Music Bar hidden
    }
  }
});

// ------------
// MUSIC PLAYER
// ------------

// Music bar
const NEXT_BUTTON = document.getElementById("nextButton"); // Next button
const PREV_BUTTON = document.getElementById("prevButton"); // Previous button

// Song Playlist
let playlist = [
  {
    src: "../sounds/music/song_1.mp3",
    title: "Song One —",
    artist: "Artist One",
  },
  {
    src: "../sounds/music/song_2.mp3",
    title: "Song Two —",
    artist: "Artist Two",
  },
  {
    src: "../sounds/music/song_3.mp3",
    title: "Song Three —",
    artist: "Artist Three",
  },
];

let currentSongIndex = 0;
let background_music = new Audio(); // Initialize audio object

// Load and display the current song
function loadSong(index) {
  let song = playlist[index]; // Get the song object at the given index
  background_music.src = song.src; // Set the audio source
  SONG_TITLE.textContent = song.title; // Update the song title
  SONG_ARTIST.textContent = song.artist; // Update the song artist
}

// Go to next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length; // Loop to the first song if at the end
  loadSong(currentSongIndex);
  if (music_playing) {
    background_music.play();
  }
}

// Go to previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // Loop to the last song if at the beginning
  loadSong(currentSongIndex);
  if (music_playing) {
    background_music.play();
  }
}

// Autoplay to next song when current one ends
background_music.addEventListener("ended", nextSong);

// Music Off function
function musicOff() {
  MUSIC_TOGGLE_IMAGE.src = "images/music_off.svg";
  music_playing = false;
  background_music.pause(); // Pause background music
  setCookie("music", "off"); // Save sound state in cookie
}

// Music On function
function musicOn() {
  MUSIC_TOGGLE_IMAGE.src = "images/music_on.svg";
  music_playing = true;
  background_music.play(); // Play background music
  setCookie("music", "on"); // Save sound state in cookie
}

// Music Toggle Button
MUSIC_TOGGLE_BUTTON.addEventListener("click", function () {
  if (music_playing === true) {
    musicOff();
  } else {
    musicOn();
  }
});

// Add event listener to save current music time periodically
background_music.addEventListener("timeupdate", function () {
  localStorage.setItem("music_time", background_music.currentTime); // Save current music time in localStorage
});

// On page load, read saved sound state and music time
window.addEventListener("load", function () {
  let savedMusic = getCookie("music");
  let savedTime = localStorage.getItem("music_time");

  loadSong(currentSongIndex); // Load the first song

  if (savedTime) {
    background_music.currentTime = parseFloat(savedTime); // Set saved playback time
  }

  if (savedMusic) {
    if (savedMusic === "on") {
      musicOn();
    } else if (savedMusic === "off") {
      musicOff();
    }
  }
});

// Event listeners for next and previous buttons
NEXT_BUTTON.addEventListener("click", nextSong);
PREV_BUTTON.addEventListener("click", prevSong);
