// Set and get "cookies"
function setSessionStorage(name, value) {
  sessionStorage.setItem(name, value);
}
function getSessionStorage(name) {
  return sessionStorage.getItem(name);
}

// Setting Buttons - Sounds
const SOUND_ON_BUTTON = document.getElementById("soundsOn");
const SOUND_OFF_BUTTON = document.getElementById("soundsOff");

// Music Bar
const MUSIC_BAR = document.getElementById("musicBar");

// Music - Buttons
const MUSIC_TOGGLE_BUTTON = document.getElementById("musicToggle");
const MUSIC_TOGGLE_IMAGE = document.getElementById("musicToggleImg");

// Music - Text
const SONG_TITLE = document.getElementById("songTitle");
const SONG_ARTIST = document.getElementById("songArtist");
const SONG_AUDIO = document.getElementById("songAudio");
const MUSIC_TEXT_DIV = document.querySelector(".music-text-div");
const MUSIC_INNER_TEXT_DIV = document.querySelector(".music-inner-text");

// Set Active Button
function setActiveButton(activeButton, otherButtons) {
  if (SOUND_ON_BUTTON) {
    activeButton.setAttribute("class", "settings-buttons button-links-active");
    otherButtons.forEach((button) =>
      button.setAttribute("class", "settings-buttons button-links-inactive")
    );
  }
}

// Text carousel if music title does not fit
function overflowScrolling() {
  const isOverflowing =
    MUSIC_INNER_TEXT_DIV.scrollWidth > MUSIC_TEXT_DIV.clientWidth;
  if (isOverflowing) {
    MUSIC_INNER_TEXT_DIV.classList.add("scrolling");
  } else {
    MUSIC_INNER_TEXT_DIV.classList.remove("scrolling");
  }
}
window.addEventListener("resize", overflowScrolling);

// Remember music state
let savedMusic = getSessionStorage("music");
setTimeout(overflowScrolling, 0);

if (savedMusic === "on") {
  musicOn();
} else if (savedMusic === "off") {
  musicOff();
}

// Music off by default for iOS
if (navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i)) {
  musicOff();
}

// On/Off sounds
let sounds_enable = new Audio("/sounds/sounds_enable.mp3");
let sounds_disable = new Audio("/sounds/sounds_disable.mp3");

// On sound
function soundsEnableSound() {
  sounds_enable.volume = 0.3;
  sounds_enable.play();
  sounds_disable.pause();
  sounds_disable.currentTime = 0;
}
// Off sound
function soundsDisableSound() {
  sounds_disable.volume = 0.3;
  sounds_disable.play();
  sounds_enable.pause();
  sounds_enable.currentTime = 0;
}

// General link sounds
let link_sound = new Audio("/sounds/links.ogg");
link_sound.volume = 0.05;

// General link sounds - Enable
function linkSounds() {
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseover", () => {
      link_sound.currentTime = 0;
      link_sound.volume = 0.05;
      link_sound.play();
    });
  });
}
// General link sounds - Disable
function linkSoundsMute() {
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseover", () => {
      link_sound.currentTime = 0;
      link_sound.volume = 0;
      link_sound.pause();
    });
  });
}

// Hide Music Bar Function
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
  soundsDisableSound();
}
// Show Music Bar Function
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
  soundsEnableSound();
}

// Settings - Sound On
if (SOUND_ON_BUTTON) {
  SOUND_ON_BUTTON.addEventListener("click", () => {
    setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
    musicBarShow();
    setSessionStorage("sound", "on");
    linkSounds();
  });
}
// Settings - Sound Off
if (SOUND_OFF_BUTTON) {
  SOUND_OFF_BUTTON.addEventListener("click", () => {
    setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
    musicBarHide();
    setSessionStorage("sound", "off");
    musicOff();
    linkSoundsMute();
  });
}

// Get sound from "cookie"
let savedSound = getSessionStorage("sound");

// Change button state depending on sound status
if (SOUND_ON_BUTTON && SOUND_OFF_BUTTON) {
  if (savedSound === "on") {
    setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
  } else if (savedSound === "off") {
    setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
  }
}

// Set class to change setting button state
function setActiveSound(activeButton, inactiveButton) {
  if (SOUND_ON_BUTTON) {
    activeButton.setAttribute("class", "settings-buttons button-links-active");
    inactiveButton.setAttribute(
      "class",
      "settings-buttons button-links-inactive"
    );
  }
}

// Tokoni Sounds
function tokoniSound() {
  let tokoni = document.getElementById("tokoni");
  let tokoni_hover = new Audio("/sounds/tokoni_hover.ogg");
  let tokoni_leave = new Audio("/sounds/tokoni_leave.ogg");
  tokoni_hover.volume = 0.05;
  tokoni_leave.volume = 0.05;
  if (tokoni) {
    tokoni.addEventListener("mouseover", () => {
      tokoni_hover.play();
    });
    tokoni.addEventListener("mouseleave", () => {
      tokoni_hover.pause();
      tokoni_hover.currentTime = 0;
      tokoni_leave.play();
      tokoni_leave.currentTime = 0;
    });
  }
}

// Logic for enabled/disabled sound
if (savedSound === "on") {
  MUSIC_BAR.style.display = "flex";
  isMusicBarVisible = true;
  overflowScrolling();
  linkSounds();
  tokoniSound();
} else if (savedSound === "off") {
  MUSIC_BAR.style.display = "none";
  isMusicBarVisible = false;
  overflowScrolling();
}

// Music Button - Turn Off
function musicOff() {
  MUSIC_TOGGLE_IMAGE.src = "/images/music_off.svg";
  MUSIC_TOGGLE_BUTTON.setAttribute("class", "button-links-inactive");
  music_playing = false;
  SONG_AUDIO.pause();
  overflowScrolling();
  setSessionStorage("music", "off");
}
// Music Button - Turn On
function musicOn() {
  MUSIC_TOGGLE_IMAGE.src = "/images/music_on.svg";
  MUSIC_TOGGLE_BUTTON.setAttribute("class", "button-links-active");
  music_playing = true;
  SONG_AUDIO.play();
  overflowScrolling();
  setSessionStorage("music", "on");
}

// Set Song Information
SONG_TITLE.textContent = SONG_AUDIO.getAttribute("data-title");
SONG_ARTIST.textContent = SONG_AUDIO.getAttribute("data-artist");

// Song Audio
SONG_AUDIO.volume = 0.3;
SONG_AUDIO.onpause = () => {
  musicOff();
};
SONG_AUDIO.onplay = () => {
  musicOn();
};

// Music Button - Default
MUSIC_TOGGLE_IMAGE.src = "/images/music_off.svg";
MUSIC_TOGGLE_BUTTON.setAttribute("class", "button-links-inactive");
MUSIC_TOGGLE_BUTTON.addEventListener("click", () => {
  music_playing ? musicOff() : musicOn();
});

// Setting Buttons - Text
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");

// Font size - Default
let font_size = "1em";

// Get font settings from "cookie"
let savedFontSize = localStorage.getItem("font_size");
let savedButton = localStorage.getItem("active_button");

// Change font settings buttons state
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

// Font size options - Small
if (TEXT_SMALL_BUTTON) {
  TEXT_SMALL_BUTTON.addEventListener("click", () => {
    setActiveButton(TEXT_SMALL_BUTTON, [TEXT_MEDIUM_BUTTON, TEXT_LARGE_BUTTON]);
    font_size = "0.85em";
    document.body.style.fontSize = font_size;
    localStorage.setItem("font_size", font_size);
    localStorage.setItem("active_button", "small");
  });
}
// Font size options - Medium
if (TEXT_MEDIUM_BUTTON) {
  TEXT_MEDIUM_BUTTON.addEventListener("click", () => {
    setActiveButton(TEXT_MEDIUM_BUTTON, [TEXT_SMALL_BUTTON, TEXT_LARGE_BUTTON]);
    font_size = "1em";
    document.body.style.fontSize = font_size;
    localStorage.setItem("font_size", font_size);
    localStorage.setItem("active_button", "medium");
  });
}
// Font size options - Large
if (TEXT_LARGE_BUTTON) {
  TEXT_LARGE_BUTTON.addEventListener("click", () => {
    setActiveButton(TEXT_LARGE_BUTTON, [TEXT_SMALL_BUTTON, TEXT_MEDIUM_BUTTON]);
    font_size = "1.1em";
    document.body.style.fontSize = font_size;
    localStorage.setItem("font_size", font_size);
    localStorage.setItem("active_button", "large");
  });
}
