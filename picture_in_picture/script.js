const videoElement=document.getElementById('video');
const button= document.getElementById('button');

// Prommpt to selsect media stream and pass to video element and then play

async function selectMedia() {
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject=mediaStream;
        videoElement.onloadedmetadata = ()=>{
            videoElement.play()
        }
    } catch (error){
        console.log('selectMedia issue', error);
    }
}

button.addEventListener('click', async () => {
    // disable button
    button.disabled=true;
    // start picture
    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled=false;
});

// On Load
selectMedia()