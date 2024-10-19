const Product = require("../../models/product.model")
const searchHelper = require("../../helpers/client/search")
const filterBrandHelper = require("../../helpers/client/filterBrand")

module.exports.index = async (req, res) => {
    let find = {
        status: "active",
        deleted: false
    }

    // Search
    const objectSearch = searchHelper(req.query)
    if(objectSearch.keyword){
        find.title = objectSearch.regex
    }

    // Refine
    if(req.query.brand){
        find.brand = req.query.brand
    }

    const filterBrand = filterBrandHelper(req.query)

    

    // Call database 
    const products = await Product.find(find)
    
    const newProducts = products.map(item => {
        item.newPrice = (item.price * (100 - item.discountPercentage) / 100).toFixed(1)
        return item
    })

    res.render("client/page/products", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts,
        keyword: objectSearch.keyword,
        filterBrand: filterBrand
    })
}