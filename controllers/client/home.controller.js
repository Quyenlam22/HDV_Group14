const Product = require("../../models/product.model")

const productHelper = require("../../helpers/client/priceNewProduct")
const searchHelper = require("../../helpers/client/search")

module.exports.index = async (req, res) => {
    let find = {
        featured: "1",
        status: "active",
        deleted: false
    }

    // Search
    const objectSearch = searchHelper(req.query)
    if(objectSearch.keyword){
        find.title = objectSearch.regex
    }

    const productsFeatured = await Product.find(find).limit(6)

    const newProductsFeatured = productHelper.priceNewProducts(productsFeatured)

    const productsNew = await Product.find({
        status: "active",
        deleted: false
    }).limit(6)

    const newProductsNew = productHelper.priceNewProducts(productsNew)

    res.render('client/page/home/index.pug', {
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew,
        keyword: objectSearch.keyword
    })
}