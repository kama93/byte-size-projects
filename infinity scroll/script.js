const imageContainer= document.getElementById('image-container');
const loader= document.getElementById('loader');

let ready=false;
let imageLoaded=0;
let totalImages=0;
let photosArray=[];


// Unsplash API
let count=10;
const apiKey='7BGLVpbYBFmtzJuTtvq6tQRorDqZ5JsQ0Df0dkIkUho';
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// loading image check
function imageLoad(){
    imageLoaded++;
    if (imageLoaded===totalImages){
        ready=true
        loader.hidden=true;
        count=30
    }
}

// halper function 'set atribute'
function setAttribute (element, atributes){
    for (const key in atributes){
        element.setAttribute(key, atributes[key])
    }
}
// Create elements- links and photos, add to DOM
function displayPhotos(){
    imageLoaded=0;
    totalImages=photosArray.length;
    photosArray.forEach((photo)=>{
        // create <a> link to Unsplash
        const item = document.createElement('a');
        setAttribute(item, {
            href: photo.links.html,
            target: '_balnk'
        })
        // create <img> for photo
        const img = document.createElement('img');
        setAttribute(img, {
            src: photo.urls.regular,
            title: photo.alt_description,
            alt: photo.alt_description
        })
        // event listner, check when loaded
        img.addEventListener('load', imageLoad);
        imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos from unsplash API
async function getPhotos(){
    try{
        const response= await fetch(apiUrl);
        photosArray= await response.json();
        displayPhotos()  
    }
    catch (error){

    }
}

// check if scrolling near bottom and load more
window.addEventListener('scroll', ()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready=false;
        getPhotos()
    }
})

// On load
getPhotos()