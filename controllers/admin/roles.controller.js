const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system")

const paginationHelper = require("../../helpers/admin/pagination")
const searchHelper = require("../../helpers/admin/search")

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    //Pagination
    const countRoles = await Role.countDocuments(find)
    
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 5
    }, req.query, countRoles)

    //Sort
    let sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    else{
        sort.title = "desc"
    }

    //Search
    const objectSearch = searchHelper(req.query)

    if (objectSearch.keyword)
        find.title = objectSearch.regex

    const records = await Role.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render("admin/page/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records,
        pagination: objectPagination,
        keyword: objectSearch.keyword
    })
}

// [GET] /admin/create
module.exports.create = async (req, res) => {
    res.render("admin/page/roles/create", {
        pageTitle: "Thêm mới nhóm quyền",
    })
}

// [POST] /admin/create
module.exports.createPost = async (req, res) => {
    try {
        const record = new Role(req.body)
        await record.save()
        req.flash("success", "Thêm mới nhóm quyền thành công !")
    } catch (error) {
        req.flash("error", "Thêm mới nhóm quyền thất bại !")
    }
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}

// [GET] /admin/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const record = await Role.findOne({
            _id: req.params.id
        })

        res.render("admin/page/roles/edit", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            record: record
        })
    } catch (error) {
        req.flash("error", "Không tìm thấy nhóm quyền !")
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [PATCH] /admin/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        await Role.updateOne({
            _id: req.params.id
        }, req.body)
        req.flash("success", "Chỉnh sửa nhóm quyền thành công !")
    } catch (error) {
        req.flash("error", "Chỉnh sửa nhóm quyền thất bại !")
    }
    res.redirect(`back`)
}

// [GET] /admin/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const record = await Role.findOne({
            _id: req.params.id,
            deleted: false
        })
        res.render("admin/page/roles/detail", {
            pageTitle: "Chi tiết nhóm quyền",
            record: record
        })
    } catch (error) {
        req.flash("Không tìm thấy nhóm quyền")
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)

    res.render("admin/page/roles/permissions", {
        pageTitle: "Phân quyền",
        records: records
    })
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions)
        for (const element of permissions) {
            await Role.updateOne({
                _id: element.id
            }, {
                permissions: element.permissions
            })
        }
        req.flash("success", "Cập nhật phân quyền thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật phân quyền thất bại!")
    }
    res.redirect("back")

}

// [PATCH] /admin/delete-item/:id
module.exports.delete = async (req, res) => {
    try {
        await Role.updateOne({
            _id: req.params.id
        }, {deleted: true})
        req.flash("success", "Xóa nhóm quyền thành công !")
    } catch (error) {
        req.flash("error", "Xóa nhóm quyền thất bại !")
    }
    res.redirect(`back`)
}