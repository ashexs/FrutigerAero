const SOUND_ON_BUTTON = document.getElementById("soundsOn");
const SOUND_OFF_BUTTON = document.getElementById("soundsOff");
const MUSIC_BAR = document.getElementById("musicBar");
const MUSIC_TOGGLE_BUTTON = document.getElementById("musicToggle");
const MUSIC_TOGGLE_IMAGE = document.getElementById("musicToggleImg");
const SONG_TITLE = document.getElementById("songTitle");
const SONG_ARTIST = document.getElementById("songArtist");
const SONG_AUDIO = document.getElementById("songAudio");
const MUSIC_TEXT_DIV = document.querySelector(".music-text-div");
const MUSIC_INNER_TEXT_DIV = document.querySelector(".music-inner-text");
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");

let font_size = "1em";
let sound_on = false;
let music_playing = false;
let isMusicBarVisible = false;

MUSIC_TOGGLE_IMAGE.src = "/images/music_off.svg";
MUSIC_TOGGLE_BUTTON.setAttribute("class", "button-links-inactive");

function setSessionStorage(name, value) {
  sessionStorage.setItem(name, value);
}

function getSessionStorage(name) {
  return sessionStorage.getItem(name);
}

function setActiveButton(activeButton, otherButtons) {
  if (SOUND_ON_BUTTON) {
    activeButton.setAttribute("class", "settings-buttons button-links-active");
    otherButtons.forEach((button) =>
      button.setAttribute("class", "settings-buttons button-links-inactive")
    );
  }
}

function overflowScrolling() {
  const isOverflowing =
    MUSIC_INNER_TEXT_DIV.scrollWidth > MUSIC_TEXT_DIV.clientWidth;

  if (isOverflowing) {
    MUSIC_INNER_TEXT_DIV.classList.add("scrolling");
  } else {
    MUSIC_INNER_TEXT_DIV.classList.remove("scrolling");
  }
}

window.addEventListener("load", () => {
  setTimeout(overflowScrolling, 0);
});

window.addEventListener("resize", overflowScrolling);

let sounds_enable = new Audio("/sounds/sounds_enable.mp3");
let sounds_disable = new Audio("/sounds/sounds_disable.mp3");

// Sounds enable sound
function soundsEnableSound() {
  sounds_enable.volume = 0.3;
  sounds_enable.play();
  sounds_disable.pause();
  sounds_disable.currentTime = 0;
}

// Sounds disable sound
function soundsDisableSound() {
  sounds_disable.volume = 0.3;
  sounds_disable.play();
  sounds_enable.pause();
  sounds_enable.currentTime = 0;
}

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

if (SOUND_ON_BUTTON) {
  SOUND_ON_BUTTON.addEventListener("click", () => {
    setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
    musicBarShow();
    setSessionStorage("sound", "on");
  });
}

if (SOUND_OFF_BUTTON) {
  SOUND_OFF_BUTTON.addEventListener("click", () => {
    setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
    musicBarHide();
    setSessionStorage("sound", "off");
    musicOff();
  });
}

// All Links sounds
function linkSounds() {
  let link_sound = new Audio("/sounds/links.ogg");
  link_sound.volume = 0.05;
  document.querySelectorAll("a, button").forEach((element) => {
    element.addEventListener("mouseover", () => {
      link_sound.currentTime = 0;
      link_sound.play();
    });
  });
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

window.addEventListener("load", () => {
  let savedSound = getSessionStorage("sound");
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

  if (SOUND_ON_BUTTON && SOUND_OFF_BUTTON) {
    if (savedSound === "on") {
      setActiveSound(SOUND_ON_BUTTON, SOUND_OFF_BUTTON, true);
    } else if (savedSound === "off") {
      setActiveSound(SOUND_OFF_BUTTON, SOUND_ON_BUTTON, false);
    }
  }
});

SONG_TITLE.textContent = SONG_AUDIO.getAttribute("data-title");
SONG_ARTIST.textContent = SONG_AUDIO.getAttribute("data-artist");

SONG_AUDIO.volume = 0.3;

SONG_AUDIO.onpause = function () {
  musicOff();
};
SONG_AUDIO.onplay = function () {
  musicOn();
};

function musicOff() {
  MUSIC_TOGGLE_IMAGE.src = "/images/music_off.svg";
  MUSIC_TOGGLE_BUTTON.setAttribute("class", "button-links-inactive");
  music_playing = false;
  SONG_AUDIO.pause();
  overflowScrolling();
  setSessionStorage("music", "off");
}

function musicOn() {
  MUSIC_TOGGLE_IMAGE.src = "/images/music_on.svg";
  MUSIC_TOGGLE_BUTTON.setAttribute("class", "button-links-active");
  music_playing = true;
  SONG_AUDIO.play();
  overflowScrolling();
  setSessionStorage("music", "on");
}

MUSIC_TOGGLE_BUTTON.addEventListener("click", () => {
  music_playing ? musicOff() : musicOn();
});

window.addEventListener("load", () => {
  let savedMusic = getSessionStorage("music");

  if (savedMusic === "on") {
    musicOn();
  } else if (savedMusic === "off") {
    musicOff();
  }

  if (navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i)) {
    musicOff();
  }

  let savedFontSize = localStorage.getItem("font_size");
  let savedButton = localStorage.getItem("active_button");

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

if (TEXT_SMALL_BUTTON) {
  TEXT_SMALL_BUTTON.addEventListener("click", function () {
    setActiveButton(TEXT_SMALL_BUTTON, [TEXT_MEDIUM_BUTTON, TEXT_LARGE_BUTTON]);
    font_size = "0.85em";
    document.body.style.fontSize = font_size;
    localStorage.setItem("font_size", font_size);
    localStorage.setItem("active_button", "small");
  });
}

if (TEXT_MEDIUM_BUTTON) {
  TEXT_MEDIUM_BUTTON.addEventListener("click", function () {
    setActiveButton(TEXT_MEDIUM_BUTTON, [TEXT_SMALL_BUTTON, TEXT_LARGE_BUTTON]);
    font_size = "1em";
    document.body.style.fontSize = font_size;
    localStorage.setItem("font_size", font_size);
    localStorage.setItem("active_button", "medium");
  });
}

if (TEXT_LARGE_BUTTON) {
  TEXT_LARGE_BUTTON.addEventListener("click", function () {
    setActiveButton(TEXT_LARGE_BUTTON, [TEXT_SMALL_BUTTON, TEXT_MEDIUM_BUTTON]);
    font_size = "1.1em";
    document.body.style.fontSize = font_size;
    localStorage.setItem("font_size", font_size);
    localStorage.setItem("active_button", "large");
  });
}
