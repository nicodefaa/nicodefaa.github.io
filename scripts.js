function toggleMenu() {
    document.getElementById("dropdownMenu").classList.toggle("show");
}

/* Close the menu if the user clicks outside of it */
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery img');
    const overlay = document.getElementById('overlay');
    const largeImage = document.getElementById('largeImage');

    // Add click event listener to each image
    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            // Set the source of the large image to the clicked image's source
            largeImage.src = image.src;
            // Display the overlay
            overlay.style.display = 'flex';
        });
    });

    // Hide the overlay when clicked
    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        largeImage.src = ''; // Reset the source of the large image
    });

    // Hide the overlay when the large image is clicked
    largeImage.addEventListener('click', () => {
        overlay.style.display = 'none';
        largeImage.src = ''; // Reset the source of the large image
    });
});


// mobile gallery swiping

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery img');
    const overlay = document.getElementById('overlay');
    const largeImage = document.getElementById('largeImage');
    const description = document.querySelector('.image-description');
    let currentImageIndex = -1;

    // Add click event listener to each image
    galleryImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            openLargeImage(index);
        });
    });

    // Function to open the large image
    function openLargeImage(index) {
        currentImageIndex = index;
        largeImage.src = galleryImages[currentImageIndex].src;
        overlay.style.display = 'flex';
        updateDescription(); // Update description when opening an image

        // Attach swipe event listeners only when the image is open
        overlay.addEventListener("touchstart", handleTouchStart);
        overlay.addEventListener("touchmove", handleTouchMove);
    }

    // Function to close the large image
    function closeLargeImage() {
        overlay.style.display = 'none';
        largeImage.src = ''; // Reset the source of the large image
        currentImageIndex = -1; // Reset index

        // Remove swipe event listeners when the image is closed
        overlay.removeEventListener("touchstart", handleTouchStart);
        overlay.removeEventListener("touchmove", handleTouchMove);
    }

    // Function to update image description
    function updateDescription() {
        if (description) {
            description.innerHTML = galleryImages[currentImageIndex].alt; // Keep this for angle brackets
        }
    }

    // Hide the overlay when clicked
    overlay.addEventListener('click', closeLargeImage);
    largeImage.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click event from bubbling up
        closeLargeImage();
    });

    // Variables to detect swipe gestures
    let xDown = null;
    let yDown = null;

    // Detect the initial touch position
    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    // Detect swipe direction
    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;

        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;

        // Swiped horizontally
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                // Swiped left -> Next image
                showNextImage();
            } else {
                // Swiped right -> Previous image
                showPreviousImage();
            }
        }

        // Reset values after the swipe
        xDown = null;
        yDown = null;
    }

    // Show the next image in the gallery
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        openLargeImage(currentImageIndex);
    }

    // Show the previous image in the gallery
    function showPreviousImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        openLargeImage(currentImageIndex);
    }
});
