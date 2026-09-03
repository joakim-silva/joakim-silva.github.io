const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const menuLinks = document.querySelectorAll(".nav-links a");

navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-open");
});

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("nav-open");
    });
});
