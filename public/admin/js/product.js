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