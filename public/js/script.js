let url = new URL(window.location.href)

const zoomImages = document.querySelectorAll("[zoom-image]")
if(zoomImages.length > 0) {
    zoomImages.forEach(image => {
        image.addEventListener("click", () => {
            window.open(`${image.src}`)
        })
    })
}

//Form Search
const formSearch = document.querySelector("#form-search")
if(formSearch){

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()
        const keyword = e.target.elements.keyword.value
        if(keyword){
            url.searchParams.set("keyword", keyword)
        }
        else{
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href
    })
}