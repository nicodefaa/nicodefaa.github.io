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

document.addEventListener("DOMContentLoaded", function() {
    const galleryImages = document.querySelectorAll(".gallery img");
    let currentImageIndex = 0;
    let largeImageContainer = null;
  
    // Function to open the large image
    function openLargeImage(index) {
      currentImageIndex = index;
  
      // Create the container for the large image if it doesn't exist
      if (!largeImageContainer) {
        largeImageContainer = document.createElement("div");
        largeImageContainer.classList.add("large-image-container");
  
        const largeImage = document.createElement("img");
        largeImage.classList.add("large-image");
        largeImageContainer.appendChild(largeImage);
  
        document.body.appendChild(largeImageContainer);
  
        // Add click event to close the image when clicking anywhere
        largeImageContainer.addEventListener("click", closeLargeImage);
  
        // Add swipe event listeners
        largeImageContainer.addEventListener("touchstart", handleTouchStart);
        largeImageContainer.addEventListener("touchmove", handleTouchMove);
      }
  
      const largeImage = largeImageContainer.querySelector(".large-image");
      largeImage.src = galleryImages[currentImageIndex].src;
  
      largeImageContainer.style.display = "flex";
    }
  
    // Function to close the large image
    function closeLargeImage() {
      largeImageContainer.style.display = "none";
    }
  
    // Attach event listeners to gallery images
    galleryImages.forEach((image, index) => {
      image.addEventListener("click", () => openLargeImage(index));
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
  
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // Swiped horizontally
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