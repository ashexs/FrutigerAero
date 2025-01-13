// Get references to text size buttons
const TEXT_SMALL_BUTTON = document.getElementById("small");
const TEXT_MEDIUM_BUTTON = document.getElementById("medium");
const TEXT_LARGE_BUTTON = document.getElementById("large");

// Default font size
let font_size = "1em";

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
  activeButton.setAttribute("class", "settings-buttons-active");
  otherButtons.forEach((button) =>
    button.setAttribute("class", "settings-buttons-inactive")
  );
}

// On page load, apply saved font size and button state from cookies
window.addEventListener("load", function () {
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
TEXT_SMALL_BUTTON.addEventListener("click", function () {
  setActiveButton(TEXT_SMALL_BUTTON, [TEXT_MEDIUM_BUTTON, TEXT_LARGE_BUTTON]);
  font_size = "0.9em";
  document.body.style.fontSize = font_size;
  setCookie("font_size", font_size);
  setCookie("active_button", "small");
});

TEXT_MEDIUM_BUTTON.addEventListener("click", function () {
  setActiveButton(TEXT_MEDIUM_BUTTON, [TEXT_SMALL_BUTTON, TEXT_LARGE_BUTTON]);
  font_size = "1em";
  document.body.style.fontSize = font_size;
  setCookie("font_size", font_size);
  setCookie("active_button", "medium");
});

TEXT_LARGE_BUTTON.addEventListener("click", function () {
  setActiveButton(TEXT_LARGE_BUTTON, [TEXT_SMALL_BUTTON, TEXT_MEDIUM_BUTTON]);
  font_size = "1.1em";
  document.body.style.fontSize = font_size;
  setCookie("font_size", font_size);
  setCookie("active_button", "large");
});
