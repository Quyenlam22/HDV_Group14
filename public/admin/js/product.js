// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus){
    buttonChangeStatus.forEach(button => {
        const id = button.getAttribute("data-id")
        const status = button.getAttribute("data-status") === "active" ? "inactive" : "active"
        button.addEventListener("click", () => {
            const formChangeStatus = document.querySelector("[change-status]")
            const path = formChangeStatus.getAttribute("path")
            formChangeStatus.action = `${path}/change-status/${id}/${status}?_method=PATCH`
            formChangeStatus.submit()
        })
    })
}

//Delete Item
const buttonDeleteItem = document.querySelectorAll("[button-deleted]")
if(buttonDeleteItem){
    buttonDeleteItem.forEach(button => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id")
            const formDeleteItem = document.querySelector("[delete-item]")
            const path = formDeleteItem.getAttribute("path")
            formDeleteItem.action = `${path}/delete-item/${id}?_method=PATCH`
            formDeleteItem.submit()
        })
    })
}