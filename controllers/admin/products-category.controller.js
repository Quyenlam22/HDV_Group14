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

// [GET] /admin/products-cateqory/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try {
        await ProductCategory.updateOne({_id: req.params.id}, {status: req.params.status})
        req.flash("success", "Chỉnh sửa danh mục thành công !")
    } catch (error) {
        req.flash("error", "Chỉnh sửa danh mục thất bại !")
    }
    res.redirect(`back`)
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
        req.flash("success", "Thêm danh mục thành công !")
    } catch (error) {
        req.flash("error", "Thêm danh mục thất bại !")
    }

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

// [GET] /admin/products-cateqory/edit/:id
module.exports.edit = async (req, res) => {
    let find = {
        deleted: false
    }

    const data = await ProductCategory.findOne({
        _id: req.params.id,
        deleted: false
    })

    const records = await ProductCategory.find(find)

    const newRecords = createTreeHelper.createTree(records)

    res.render("admin/page/products-category/edit", {
        pageTitle: 'Chỉnh sửa danh mục',
        data: data,
        records: newRecords
    })
}

// [PATCH] /admin/products-cateqory/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.position = parseInt(req.body.position)
    if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`
    }
   
    try {
        await ProductCategory.updateOne({_id: req.params.id}, req.body)
        req.flash("success", "Sửa danh mục thành công !")
    } catch (error) {
        req.flash("error", "Sửa danh mục thất bại !")
    }

    res.redirect(`back`)
}

// [GET] /admin/products-cateqory/detail/:id
module.exports.detail = async (req, res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }

    const record = await ProductCategory.findOne(find)

   
    if(record.parent_id){
        var parent = await ProductCategory.findOne({
            _id: record.parent_id,
            deleted: false
        })
    }

    res.render("admin/page/products-category/detail", {
        pageTitle: 'Chi tiết danh mục',
        record: record,
        parent: parent
    })
}

// [PATCH] /admin/products-cateqory/delete-item/:id
module.exports.delete = async (req, res) => {
    try {
        await ProductCategory.updateOne({_id: req.params.id}, {deleted: true})
        req.flash("success", "Xóa danh mục thành công !")
    } catch (error) {
        req.flash("error", "Xóa danh mục thất bại !")
    }

    res.redirect(`back`)
}