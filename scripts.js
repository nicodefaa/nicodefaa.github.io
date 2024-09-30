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

const images = document.querySelectorAll('.gallery img');
let currentIndex = 0; // Tracks the current image index
let startX = 0; // To record the starting X position of the touch

// Function to show the large image
function showLargeImage(index) {
  const overlay = document.getElementById('overlay');
  const largeImage = document.querySelector('.large-image');
  largeImage.src = images[index].src;
  overlay.style.display = 'flex';
  currentIndex = index; // Update the current image index
}

// Close the large image when clicking anywhere
document.getElementById('overlay').addEventListener('click', function () {
  this.style.display = 'none';
});

// Swipe event listeners
document.querySelector('.large-image').addEventListener('touchstart', function (e) {
  startX = e.touches[0].clientX;
});

document.querySelector('.large-image').addEventListener('touchend', function (e) {
  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) { // Sensitivity threshold for swiping
    if (diffX > 0) {
      // Swiped left, show next image
      showNextImage();
    } else {
      // Swiped right, show previous image
      showPreviousImage();
    }
  }
});

function showNextImage() {
  currentIndex = (currentIndex + 1) % images.length; // Loop back to first image if at the end
  showLargeImage(currentIndex);
}

function showPreviousImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; // Loop back to last image if at the beginning
  showLargeImage(currentIndex);
}

// Attach click event listeners to each image in the gallery
images.forEach((image, index) => {
  image.addEventListener('click', () => showLargeImage(index));
});