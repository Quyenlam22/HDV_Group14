module.exports = (query) => {
    let filterBrand = [
        {
            name: "Tất cả",
            brand: "",
            class: ""
        },
        {
            name: "Apple",
            brand: "Apple",
            class: ""
        },
        {
            name: "Sam Sung",
            brand: "Samsung",
            class: ""
        },
        {
            name: "Mobile Tablets",
            brand: "Mobile Tablets",
            class: ""
        }
    ]

    if(query.brand){
        const index = filterBrand.findIndex(item => item.brand == query.brand)
        filterBrand[index].class = "active"
    }
    else{
        const index = filterBrand.findIndex(item => item.brand == "")
        filterBrand[index].class = "active"
    }
    return filterBrand
}