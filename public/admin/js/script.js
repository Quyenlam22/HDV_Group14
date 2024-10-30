//Filter Status
const buttonStatus = document.querySelectorAll("[button-status]")
if (buttonStatus) {
    let url = new URL(window.location.href)

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }

            window.location.href = url.href
        })
    })
}

//Search 
const formSearch = document.querySelector("#form-search")
if (formSearch) {
    let url = new URL(window.location.href)

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault()

        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href
    })
}

//CheckBox Multi
const table = document.querySelector("[checkbox-multi]")
if (table) {
    const checkAll = table.querySelector("[name=checkall]")
    const inputsId = table.querySelectorAll("[name=id]")
    checkAll.addEventListener("click", () => {
        if (checkAll.checked == true) {
            inputsId.forEach(id => {
                id.checked = true
            })
        } else {
            inputsId.forEach(id => {
                id.checked = false
            })
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const inputsChecked = document.querySelectorAll("[name=id]:checked")
            if (inputsChecked.length === inputsId.length) {
                checkAll.checked = true
            } else
                checkAll.checked = false
        })
    })
}

//Show alert
const showAlert = document.querySelector("[show-alert]")
if (showAlert) {
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
if (uploadImage) {
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]")
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]")
    const closeImage = uploadImage.querySelector("[close-image]")
    uploadImageInput.addEventListener("change", (e) => {
        const file = e.target.files[0]
        if (file) {
            uploadImagePreview.src = URL.createObjectURL(file)
            closeImage.style.display = "block"

            closeImage.addEventListener("click", () => {
                uploadImagePreview.src = ""
                uploadImageInput.value = ""
                closeImage.style.display = "none"
            })
        }
    })
}

//Change Multi Status
const formChangeMulti = document.querySelector('[form-change-multi]')
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault()
        const inputsChecked = document.querySelectorAll("input[name='id']:checked")

        const typeChange = e.target.elements.type.value

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Đồng ý xóa?")
            if(!isConfirm){
                return
            }
        }

        if (inputsChecked.length > 0) {
            let listIds = []
            const inputIds = formChangeMulti.querySelector("[name='ids']")
            
            inputsChecked.forEach(input => {
                if(typeChange == "change-position"){
                    const position = input.closest("tr").querySelector("input[name='position']").value
                    listIds.push(`${input.value}-${position}`)
                }  
                else{
                    listIds.push(input.value)
                }
            })

            inputIds.value = listIds.join(", ")
            formChangeMulti.submit()
        }
        else{
            alert("Vui lòng chọn ít nhất một bản ghi!")
        }
    })
}

// Edit Product
const selectBrand = document.querySelector('#brand')
if(selectBrand){
    const brand = selectBrand.getAttribute("brand")
    const options = selectBrand.querySelectorAll("option")
    options.forEach(option => {
        if(option.value == brand){
            option.selected = true
        }
    })
}

//Pagination
const pagination = document.querySelector(".pagination")
if(pagination){
    let url = new URL(window.location.href)

    const buttonPagination = document.querySelectorAll("[button-pagination]")
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            
            url.searchParams.set("page", page)
            
            window.location.href = url.href
        })
    })
}