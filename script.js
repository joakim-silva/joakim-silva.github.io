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

// Highlight the navigation link for the section currently in view
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");

                menuLinks.forEach((link) => {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.35
    }
);

// Watch every section
sections.forEach((section) => {
    observer.observe(section);
});

// Back to top button

const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
