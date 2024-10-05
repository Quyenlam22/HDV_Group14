const Product = require("../../models/product.model")
const searchHelper = require("../../helpers/search")

module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    // Search
    const objectSearch = searchHelper(req.query)
    console.log(objectSearch)
    if(objectSearch.keyword){
        find.title = objectSearch.regex
    }

    // Call database 
    const products = await Product.find(find)
    
    const newProducts = products.map(item => {
        item.newPrice = (item.oldPrice * (100 - item.discountPercent) / 100).toFixed(1)
        return item
    })

    res.render("client/page/products", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts,
        keyword: objectSearch.keyword
    })
}