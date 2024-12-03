const Product = require("../../models/product.model")

const productHelper = require("../../helpers/client/priceNewProduct")

module.exports.index = async (req, res) => {
    const productsFeatured = await Product.find({
        featured: "1",
        status: "active",
        deleted: false
    }).limit(6)

    const newProductsFeatured = productHelper.priceNewProducts(productsFeatured)

    const productsNew = await Product.find({
        status: "active",
        deleted: false
    }).limit(6)

    const newProductsNew = productHelper.priceNewProducts(productsNew)

    res.render('client/page/home/index.pug', {
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    })
}