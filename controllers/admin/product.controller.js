const Product = require("../../models/product.model")

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")

module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    // Filter Status
    const filterStatus = filterStatusHelper(req.query)

    if (req.query.status)
        find.status = req.query.status

    // Search
    const objectSearch = searchHelper(req.query)

    if (req.query.keyword)
        find.title = objectSearch.regex

    const products = await Product.find(find)

    res.render("admin/page/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
}