//Filter Status
const buttonStatus = document.querySelectorAll("[button-status]")
if(buttonStatus){
    let url = new URL(window.location.href)

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status", status)
            }
            else{
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}

//Search 
const formSearch = document.querySelector("#form-search")
if(formSearch){
    let url = new URL(window.location.href)
    
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()

        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set("keyword", keyword)
        }
        else{
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href
    })
}

//CheckBox Multi
const table = document.querySelector("[checkbox-multi]")
if(table){
    const checkAll = table.querySelector("[name=checkall]")
    const inputsId  = table.querySelectorAll("[name=id]")
    checkAll.addEventListener("click", () => {
        if(checkAll.checked == true){
            inputsId.forEach(id => {
                id.checked = true
            })
        }
        else{
            inputsId.forEach(id => {
                id.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const inputsChecked = document.querySelectorAll("[name=id]:checked")
            if(inputsChecked.length === inputsId.length){
                checkAll.checked = true
            }
            else    
                checkAll.checked = false
        })
    })
}

//Show alert
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"))
    const closeAlert = document.querySelector("[close-alert]")
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time)
}

//Upload Image
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")
    uploadImageInput.addEventListener("change", () => {
        const [file] = uploadImageInput.files
        uploadImagePreview.src = URL.createObjectURL(file)
    })
}