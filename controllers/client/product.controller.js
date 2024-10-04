const Product = require("../../models/product.model")

module.exports.index = async (req, res) => {
    // Call database 
    const products = await Product.find({})

    const newProducts = products.map(item => {
        item.newPrice = (item.oldPrice * (100 - item.discountPercent) / 100).toFixed(1)
        return item
    })

    res.render("client/page/products", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    })
}