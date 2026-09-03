const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");

// Open and close the mobile navigation
navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
});

// Close the mobile navigation when a link is clicked
menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");
    });
});

// Highlight the navigation link for the current section
window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute("id");
        }
    });

    menuLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});
