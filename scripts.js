document.addEventListener("DOMContentLoaded", () => {
    // Hover effect for buttons
    const buttons = document.querySelectorAll(".glossy-button");

    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.background = "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1)), linear-gradient(to bottom, #1abc9c, #16a085)";
            button.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.5)";
        });

        button.addEventListener("mouseout", () => {
            button.style.background = "linear-gradient(to bottom, #1abc9c, #16a085)";
            button.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.4)";
        });

        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.95)";
            button.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.3)";
        });

        button.addEventListener("mouseup", () => {
            button.style.transform = "scale(1)";
            button.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.4)";
        });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector(".glossy-header").offsetHeight,
                    behavior: "smooth",
                });
            }
        });
    });

    // Easter egg: Secret message
    document.body.addEventListener("keydown", (event) => {
        if (event.code === "KeyF" && event.ctrlKey) {
            alert("Frutiger Aero vibes activated! 🌌");
        }
    });

    // Adaptive theme toggle (Light/Dark Aero Mode)
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Theme";
    toggleButton.classList.add("glossy-button");
    toggleButton.style.position = "fixed";
    toggleButton.style.bottom = "20px";
    toggleButton.style.right = "20px";
    document.body.appendChild(toggleButton);

    let isDarkMode = false;

    toggleButton.addEventListener("click", () => {
        isDarkMode = !isDarkMode;

        if (isDarkMode) {
            document.body.style.background = "linear-gradient(to bottom, #1e1e1e, #333)";
            document.body.style.color = "#ccc";
        } else {
            document.body.style.background = "linear-gradient(to bottom, #2c3e50, #16a085)";
            document.body.style.color = "#fff";
        }
    });
});
