const Role = require("../../models/roles.model")
const systemConfig = require("../../config/system")

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)

    res.render("admin/page/roles/index", {
        titlePage: "Nhóm quyền",
        records: records
    })
}

// [GET] /admin/create
module.exports.create = async (req, res) => {
    res.render("admin/page/roles/create", {
        titlePage: "Thêm mới nhóm quyền",
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

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Role.find(find)

    res.render("admin/page/roles/permissions", {
        titlePage: "Phân quyền",
        records: records
    })
}