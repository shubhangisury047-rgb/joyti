/* ===== ART CATEGORY FILTER ===== */

const filterButtons = document.querySelectorAll(".filter-btn");
const artCards = document.querySelectorAll(".art-card");
const emptyMessage = document.getElementById("empty-message");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        // Remove active class from all buttons
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        // Activate selected button
        button.classList.add("active");

        // Get selected category
        const selectedCategory = button.dataset.filter;
        let visibleCount = 0;

        // Show or hide artwork cards
        artCards.forEach(function (card) {
            const category = card.dataset.category;

            if (
                selectedCategory === "all" ||
                category === selectedCategory
            ) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }
        });

        // Show message if there are no matching cards
        emptyMessage.hidden = visibleCount > 0;
    });
});


/* ===== IMAGE LIGHTBOX ===== */

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeButton = document.querySelector(".close-lightbox");

const viewButtons = document.querySelectorAll(".view-art");

viewButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        const card = button.closest(".art-card");
        const image = card.querySelector(".art-image img");
        const title = card.querySelector("h3").textContent;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCaption.textContent = title;

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
        closeButton.focus();
    });
});


/* Close popup using close button */
function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";
    document.body.style.overflow = "";
}

closeButton.addEventListener("click", closeLightbox);


/* Close popup by clicking outside the image */
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});


/* Close popup using Escape key */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && lightbox.classList.contains("open")) {
        closeLightbox();
    }
});


/* ===== AUTOMATIC FOOTER YEAR ===== */

document.getElementById("year").textContent =
    new Date().getFullYear();