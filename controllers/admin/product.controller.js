const Product = require("../../models/product.model")

const filterStatusHelper = require("../../helpers/admin/filterStatus")
const searchHelper = require("../../helpers/admin/search")


// [GET] /admin/products/
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

// [PATCH] /admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try{
        const id = req.params.id
        const status = req.params.status
        await Product.updateOne({_id: id}, {status: status})
        req.flash('success', 'Cập nhật trạng thái sản phẩm thành công !')
    }catch(error){
        req.flash('error', 'Cập nhật trạng thái sản phẩm thất bại !')
    }
    
    res.redirect("back")
}

// [PATCH] /admin/products/delete-item/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id
        await Product.updateOne({_id: id}, {deleted: true})
        req.flash('success', 'Xóa sản phẩm thành công !')
    } catch (error) {
        req.flash('error', 'Xóa sản phẩm thất bại !')
    }
    res.redirect("back")
}