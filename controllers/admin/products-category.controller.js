const ProductCategory = require("../../models/products-category.model")
const systemConfig = require("../../config/system")

const createTreeHelper = require("../../helpers/admin/createTree")

// [GET] /admin/products-cateqory
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.createTree(records)

    res.render("admin/page/products-category/index", {
        pageTitle: 'Danh mục sản phẩm',
        records: newRecords
    })
}

// [GET] /admin/products-cateqory/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.createTree(records)

    res.render("admin/page/products-category/create", {
        pageTitle: 'Thêm mới danh mục',
        records: newRecords
    })
}

// [POST] /admin/products-cateqory/create
module.exports.createPost = async (req, res) => {
    if (req.body.position == '') {
        const count = await ProductCategory.countDocuments()
        req.body.position = count + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`
    }
    
    try {
        const record = new ProductCategory(req.body)
        await record.save()
        req.flash("success", "Thêm sanh mục thành công !")
    } catch (error) {
        req.flash("error", "Thêm sanh mục thất bại !")
    }

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}