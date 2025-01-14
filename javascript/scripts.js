// Sound and music button elements
const SOUND_ON_BUTTON = document.getElementById("soundsOn");
const SOUND_OFF_BUTTON = document.getElementById("soundsOff");

// Music bar elements
const MUSIC_BAR = document.getElementById("musicBar");
const MUSIC_TOGGLE_BUTTON = document.getElementById("musicToggle");
const MUSIC_TOGGLE_IMAGE = document.getElementById("musicToggleImg");

// Song information display
const SONG_TITLE = document.getElementById("songTitle");
const SONG_ARTIST = document.getElementById("songArtist");

// Playlist Text for scrolling
const MUSIC_TEXT_DIV = document.querySelector(".music-text-div");
const MUSIC_INNER_TEXT_DIV = document.querySelector(".music-inner-text");

// Get references to text size buttons
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");

// Default font size
let font_size = "1em";

// Initial states for sound and music
let sound_on = false;
let music_playing = false;
let isMusicBarVisible = false; // To prevent overlapping animations

// Set a cookie with a specified name and value
function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

// Get a cookie value by name
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Set active button and reset others
function setActiveButton(activeButton, otherButtons) {
  if (SOUND_ON_BUTTON) {
    activeButton.setAttribute("class", "settings-buttons button-links-active");
    otherButtons.forEach((button) =>
      button.setAttribute("class", "settings-buttons button-links-inactive")
    );
  }
}

// Function to check if text is overflowing and apply scrolling if needed
function overflowScrolling() {
  const isOverflowing =
    MUSIC_INNER_TEXT_DIV.scrollWidth > MUSIC_TEXT_DIV.clientWidth;

  if (isOverflowing) {
    MUSIC_INNER_TEXT_DIV.classList.add("scrolling");
  } else {
    MUSIC_INNER_TEXT_DIV.classList.remove("scrolling");
  }
}

// Check overflow when the page loads
window.addEventListener("load", () => {
  setTimeout(overflowScrolling, 0); // Ensure layout is ready before measuring
});

// Check overflow on window resize
window.addEventListener("resize", overflowScrolling);

// Fade out the music bar
function musicBarHide() {
  if (!isMusicBarVisible) return;
  isMusicBarVisible = false;
  let op = 1;
  MUSIC_BAR.style.opacity = op;
  let timer = setInterval(() => {
    if (op <= 0) {
      clearInterval(timer);
      MUSIC_BAR.style.visibility = "hidden";
      MUSIC_BAR.style.display = "none";
    }
    op -= 0.5;
    MUSIC_BAR.style.opacity = op;
    MUSIC_BAR.style.filter = "alpha(opacity=" + op * 100 + ")";
  }, 50);
}

// Fade in the music bar
function musicBarShow() {
  if (isMusicBarVisible) return;
  isMusicBarVisible = true;
  MUSIC_BAR.style.display = "flex";
  MUSIC_BAR.style.visibility = "visible";
  let op = 0;
  MUSIC_BAR.style.opacity = op;
  let timer = setInterval(() => {
    if (op >= 1) {
      clearInterval(timer);
    }
    op += 0.5;
    MUSIC_BAR.style.opacity = op;
    MUSIC_BAR.style.filter = "alpha(opacity=" + op * 100 + ")";
  }, 50);
}

// Handle sound on/off button clicks
if (SOUND_ON_BUTTON) {
  SOUND_ON_BUTTON.addEventListener("click", () => {
    setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
    musicBarShow();
    setCookie("sound", "on");
  });
}

if (SOUND_OFF_BUTTON) {
  SOUND_OFF_BUTTON.addEventListener("click", () => {
    setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
    musicBarHide();
    setCookie("sound", "off");
    musicOff();
  });
}

// Update button states and sound status
function setActiveSound(activeButton, inactiveButton, isSoundOn) {
  if (SOUND_ON_BUTTON) {
    activeButton.setAttribute("class", "settings-buttons button-links-active");
    inactiveButton.setAttribute(
      "class",
      "settings-buttons button-links-inactive"
    );
    sound_on = isSoundOn;
  }
}

// Load saved sound state on page load
window.addEventListener("load", () => {
  let savedSound = getCookie("sound");
  if (savedSound === "on") {
    MUSIC_BAR.style.display = "flex";
    isMusicBarVisible = true;
    overflowScrolling();
  } else if (savedSound === "off") {
    MUSIC_BAR.style.display = "none";
    isMusicBarVisible = false;
    overflowScrolling();
  }

  // Check if SOUND_ON_BUTTON and SOUND_OFF_BUTTON exist before interacting with them
  if (SOUND_ON_BUTTON && SOUND_OFF_BUTTON) {
    if (savedSound === "on") {
      setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
    } else if (savedSound === "off") {
      setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
    }
  }
});

// Music player controls
const NEXT_BUTTON = document.getElementById("nextButton");
const PREV_BUTTON = document.getElementById("prevButton");

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
let background_music = new Audio();

// Load a song from the playlist
function loadSong(index) {
  let song = playlist[index];
  background_music.src = song.src;
  SONG_TITLE.textContent = song.title;
  SONG_ARTIST.textContent = song.artist;
}

// Go to the next song in the playlist
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  if (music_playing) background_music.play();
  overflowScrolling();
}

// Go to the previous song in the playlist
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  if (music_playing) background_music.play();
  overflowScrolling();
}

// Auto-play the next song when the current one ends
background_music.addEventListener("ended", nextSong, overflowScrolling);

// Turn off music and update UI
function musicOff() {
  MUSIC_TOGGLE_IMAGE.src = "images/music_off.svg";
  music_playing = false;
  background_music.pause();
  overflowScrolling();
  setCookie("music", "off");
}

// Turn on music and update UI
function musicOn() {
  MUSIC_TOGGLE_IMAGE.src = "images/music_on.svg";
  music_playing = true;
  background_music.play();
  overflowScrolling();
  setCookie("music", "on");
}

// Toggle music on/off when the button is clicked
MUSIC_TOGGLE_BUTTON.addEventListener("click", () => {
  music_playing ? musicOff() : musicOn();
});

// Save current playback time periodically
background_music.addEventListener("timeupdate", () => {
  localStorage.setItem("music_time", background_music.currentTime);
});

// Load saved music state and playback time on page load
window.addEventListener("load", () => {
  let savedMusic = getCookie("music");
  let savedTime = localStorage.getItem("music_time");

  loadSong(currentSongIndex);

  if (savedTime) background_music.currentTime = parseFloat(savedTime);

  if (savedMusic === "on") {
    musicOn();
  } else if (savedMusic === "off") {
    musicOff();
  }

  // Font size handling for text buttons
  let savedFontSize = getCookie("font_size");
  let savedButton = getCookie("active_button");

  if (savedFontSize && savedButton) {
    document.body.style.fontSize = savedFontSize;

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

// Event listeners for text size buttons
if (TEXT_SMALL_BUTTON) {
  TEXT_SMALL_BUTTON.addEventListener("click", function () {
    setActiveButton(TEXT_SMALL_BUTTON, [TEXT_MEDIUM_BUTTON, TEXT_LARGE_BUTTON]);
    font_size = "0.9em";
    document.body.style.fontSize = font_size;
    setCookie("font_size", font_size);
    setCookie("active_button", "small");
  });
}

if (TEXT_MEDIUM_BUTTON) {
  TEXT_MEDIUM_BUTTON.addEventListener("click", function () {
    setActiveButton(TEXT_MEDIUM_BUTTON, [TEXT_SMALL_BUTTON, TEXT_LARGE_BUTTON]);
    font_size = "1em";
    document.body.style.fontSize = font_size;
    setCookie("font_size", font_size);
    setCookie("active_button", "medium");
  });
}

if (TEXT_LARGE_BUTTON) {
  TEXT_LARGE_BUTTON.addEventListener("click", function () {
    setActiveButton(TEXT_LARGE_BUTTON, [TEXT_SMALL_BUTTON, TEXT_MEDIUM_BUTTON]);
    font_size = "1.1em";
    document.body.style.fontSize = font_size;
    setCookie("font_size", font_size);
    setCookie("active_button", "large");
  });
}
