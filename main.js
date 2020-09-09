const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// image loading function 
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }
}
// Looping Over Photos Array 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // cretaing <a> tag for link 
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // creating <img> tag
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        // checking the each image is loaded
        img.addEventListener('load', imageLoaded);
        // Append <img> inside <a> then both in image container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API
const apiKey = '9W6baHucF3ct-P8AjYx4s_HY1wxtZSnWPzU5unZqFLk';
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//  Fetching Data From API
async function getPhotosFromApi() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // display Photos Array
        displayPhotos();
    }
    catch (error) {

    }
}

// get more photos on scroll reaches to end 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotosFromApi();
    }
})

// On Load
getPhotosFromApi();