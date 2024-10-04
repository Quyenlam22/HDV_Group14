let url = new URL(window.location.href)

const zoomImages = document.querySelectorAll("[zoom-image]")
if(zoomImages.length > 0) {
    console.log(zoomImages)
    zoomImages.forEach(image => {
        image.addEventListener("click", () => {
            window.open(`${image.src}`)
        })
    })
}