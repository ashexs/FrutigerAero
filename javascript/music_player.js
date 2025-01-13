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

// Initial states for sound and music
let sound_on = false;
let music_playing = false;
let isMusicBarVisible = false; // To prevent overlapping animations

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
SOUND_ON_BUTTON.addEventListener("click", () => {
  setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
  musicBarShow();
  setCookie("sound", "on");
});

SOUND_OFF_BUTTON.addEventListener("click", () => {
  setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
  musicBarHide();
  setCookie("sound", "off");
  musicOff();
});

// Update button states and sound status
function setActiveSound(activeButton, inactiveButton, isSoundOn) {
  activeButton.setAttribute("class", "settings-buttons-active");
  inactiveButton.setAttribute("class", "settings-buttons-inactive");
  sound_on = isSoundOn;
}

// Load saved sound state on page load
window.addEventListener("load", () => {
  let savedSound = getCookie("sound");
  if (savedSound === "on") {
    setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
    MUSIC_BAR.style.display = "flex";
    isMusicBarVisible = true;
  } else if (savedSound === "off") {
    setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
    MUSIC_BAR.style.display = "none";
    isMusicBarVisible = false;
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
}

// Go to the previous song in the playlist
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(currentSongIndex);
  if (music_playing) background_music.play();
}

// Auto-play the next song when the current one ends
background_music.addEventListener("ended", nextSong);

// Turn off music and update UI
function musicOff() {
  MUSIC_TOGGLE_IMAGE.src = "images/music_off.svg";
  music_playing = false;
  background_music.pause();
  setCookie("music", "off");
}

// Turn on music and update UI
function musicOn() {
  MUSIC_TOGGLE_IMAGE.src = "images/music_on.svg";
  music_playing = true;
  background_music.play();
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
});

// Add event listeners for next/previous buttons
NEXT_BUTTON.addEventListener("click", nextSong);
PREV_BUTTON.addEventListener("click", prevSong);
