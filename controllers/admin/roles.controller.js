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

// [GET] /admin/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const record = await Role.findOne({
            _id: req.params.id
        })

        res.render("admin/page/roles/edit", {
            titlePage: "Chỉnh sửa nhóm quyền",
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