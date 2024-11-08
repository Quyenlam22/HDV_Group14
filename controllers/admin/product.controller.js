const ProductCategory = require("../../models/products-category.model")
const Product = require("../../models/product.model")
const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helpers/admin/filterStatus")
const searchHelper = require("../../helpers/admin/search")

const createTreeHelper = require("../../helpers/admin/createTree")

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

    //Pagination
    const countProducts = await Product.countDocuments(find)
    
    let objectPagination = {
        currentPage: 1,
        limitItems: 5
    }

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page)
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems

    objectPagination.totalPage = Math.ceil((countProducts/objectPagination.limitItems))

    //Sort
    let sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    else{
        sort.position = "desc"
    }

    const products = await Product.find(find)
                            .sort(sort)
                            .limit(objectPagination.limitItems)
                            .skip(objectPagination.skip)

    res.render("admin/page/products/index.pug", {
        pageTitle: "Trang sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

// [PATCH] /admin/products/change-status/:id/:status
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        const status = req.params.status
        await Product.updateOne({
            _id: id
        }, {
            status: status
        })
        req.flash('success', 'Cập nhật trạng thái sản phẩm thành công !')
    } catch (error) {
        req.flash('error', 'Cập nhật trạng thái sản phẩm thất bại !')
    }

    res.redirect("back")
}

// [PATCH] /admin/products/delete-item/:id
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id
        await Product.updateOne({
            _id: id
        }, {
            deleted: true
        })
        req.flash('success', 'Xóa sản phẩm thành công !')
    } catch (error) {
        req.flash('error', 'Xóa sản phẩm thất bại !')
    }
    res.redirect("back")
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    const records = await ProductCategory.find({deleted: false})

    const newRecords = createTreeHelper.createTree(records)

    res.render("admin/page/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm",
        records: newRecords
    })
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseFloat(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if (req.body.position == '') {
        const countProducts = await Product.countDocuments()
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`
    }

    try {
        const product = new Product(req.body)
        await product.save()

        req.flash("success", `Thêm sản phẩm thành công!`)
    } catch (error) {
        req.flash("error", `Thêm sản phẩm thất bại!`)
    }

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const type = req.body.type
        const ids = req.body.ids.split(", ")

        switch (type) {
            case "active":
                await Product.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: "active"
                })
                req.flash('success', `Cập nhật trạng thái cho ${ids.length} sản phẩm thành công !`)
                break;
            case "inactive":
                await Product.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    status: "inactive"
                })
                req.flash('success', `Cập nhật trạng thái cho ${ids.length} sản phẩm thành công !`)
                break;
            case "delete-all":
                await Product.updateMany({
                    _id: {
                        $in: ids
                    }
                }, {
                    deleted: true,
                    deletedAt: new Date()
                })
                req.flash('success', `Xóa ${ids.length} sản phẩm thành công !`)
                break;
            case "change-position":
                for (const element of ids) {
                    let [id, position] = element.split("-")
                    await Product.updateOne({_id: id}, {position: position})
                }
                req.flash('success', `Sửa vị trí cho ${ids.length} sản phẩm thành công !`)
                break;
        }
    } catch (error) {
        req.flash('error', 'Cập nhật thất bại !')
    }
    res.redirect("back")
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        let find = {
            _id: req.params.id
        }
        const product = await Product.findOne(find)
    
        const records = await ProductCategory.find({deleted: false})

        const newRecords = createTreeHelper.createTree(records)

        res.render("admin/page/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            records: newRecords
        })
    } catch (error) {
        req.flash('error', 'Không tìm thấy sản phẩm !')
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseFloat(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    req.body.position = parseInt(req.body.position)

    if (req.file) {
        req.body.image = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({_id: req.params.id}, req.body)
        req.flash("success", `Thêm sản phẩm thành công!`)
    } catch (error) {
        req.flash("error", `Thêm sản phẩm thất bại!`)
    }

    res.redirect(`back`)
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        let find = {
            _id: req.params.id
        }
        const product = await Product.findOne(find)

        if(product.product_category_id){
            var productCategory = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted: false
            })
        }

        res.render("admin/page/products/detail.pug", {
            pageTitle: "Chi tiết sản phẩm",
            product: product,
            record: productCategory
        })
    } catch (error) {
        req.flash('error', 'Không tìm thấy sản phẩm !')
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}