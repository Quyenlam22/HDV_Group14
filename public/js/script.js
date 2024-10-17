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

//Filter Brand
const buttonsBrand = document.querySelectorAll("[button-brand]")
if(buttonsBrand.length > 0){
    buttonsBrand.forEach(button => {
        button.addEventListener("click", () =>{
            const brand = button.getAttribute("button-brand")
            if(brand){
                url.searchParams.set("brand", brand)
            }
            else{
                url.searchParams.delete("brand")
            }
            
            window.location.href = url.href
        })
    })
}

//Dark Light Mode
const buttonLightMode = document.querySelector(".light-mode")
const buttonDarkMode = document.querySelector(".dark-mode")
const body = document.querySelector("body")

const loadPage = localStorage.getItem("mode")
if(loadPage){
    body.classList.toggle(loadPage)
    buttonDarkMode.classList.add("button-mode-click")
    buttonLightMode.classList.remove("button-mode-click")
}

console.log(loadPage)

buttonDarkMode.addEventListener("click", () => {
    buttonDarkMode.classList.add("button-mode-click")
    buttonLightMode.classList.remove("button-mode-click")
    const currentMode = localStorage.getItem("mode")
    if(!currentMode){
        localStorage.setItem("mode", "dark")
    }
    body.classList.add("dark")
})
buttonLightMode.addEventListener("click", () => {
    buttonDarkMode.classList.remove("button-mode-click")
    buttonLightMode.classList.add("button-mode-click")
    const currentMode = localStorage.getItem("mode")
    if(currentMode){
        localStorage.setItem("mode", "")
    }
    body.classList.remove("dark")
})

//Order Quantity
const orderQuantities = document.querySelectorAll(".order-quantity")
if(orderQuantities){
    orderQuantities.forEach(orderQuantity => {
        const buttonReduce = orderQuantity.querySelector("[button-reduce]");
        const buttonincrease = orderQuantity.querySelector("[button-increase]");
        const inputOrder = orderQuantity.querySelector(".order-value")
        buttonReduce.addEventListener("click", (e) => {
            if(inputOrder.value <= 1){
                alert("Tối thiểu là 1 sản phẩm")
                return;
            }

            inputOrder.value = parseInt(inputOrder.value) - 1
        })
        buttonincrease.addEventListener("click", (e) => {
            inputOrder.value = parseInt(inputOrder.value) + 1
        })
    })
}
