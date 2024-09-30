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