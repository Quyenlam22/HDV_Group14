const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")

const systemConfig = require("../../config/system")
const generate = require("../../helpers/admin/generate")

const md5 = require("md5")

// [GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }
    
    const records = await Account.find(find).select("-password -token")

    for(const record of records){
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        })
        record.role = role
    }
    res.render("admin/page/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    })
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({deleted: false})
    res.render("admin/page/accounts/create", {
        pageTitle: "Thêm tài khoản",
        roles: roles
    })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {  
    try {
        const emailExist = await Account.findOne({
            email: req.body.email,
            deleted: false
        })
        if(emailExist){
            req.flash("error", `Email ${req.body.email} đã tồn tại!`)
            res.redirect('back')
        }
        else{
            req.body.password = md5(req.body.password)

            if (req.file) {
                req.body.avatar = `/uploads/${req.file.filename}`
            }
            req.body.token = generate.generateRandomString(20)

            const account = new Account(req.body)
            await account.save()
            req.flash("success", "Thêm tài khoản thành công!")
            res.redirect(`${systemConfig.prefixAdmin}/accounts`)
        }
    } catch (error) {
        req.flash("error", "Thêm tài khoản thất bại!")
        res.redirect("back")
    }
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    try{
        const account = await Account.findOne({
            _id: req.params.id,
            deleted: false
        })
        const roles = await Role.find({
            deleted: false
        })
        
        res.render("admin/page/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            account: account,
            roles: roles
        })
    }
    catch(error){
        req.flash("error", "Không tìm thấy tài khoản!")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

//[PATCH] admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => { 
    try {
        const emailExist = await Account.findOne({
            _id: {$ne: req.params.id},
            email: req.body.email,
            deleted: false
        })

        if (emailExist) {
            req.flash("error", `Email ${req.body.email} đã tồn tại`)
        }

        if(req.body.password){
            req.body.password = md5(req.body.password)
        }
        else{
            delete req.body.password
        }

        if (req.file) {
            req.body.avatar = `/uploads/${req.file.filename}`
        }

        await Account.updateOne({_id: req.params.id}, req.body)

        req.flash("success", "Cập nhật tài khoản thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật tài khoản thất bại!")
    }

    res.redirect(`back`)
}

// [GET] /admin/accounts/detail/:id
module.exports.detail = async (req, res) => {
    try{
        const account = await Account.findOne({
            _id: req.params.id,
            deleted: false
        })

        const role = await Role.findOne({
            _id: account.role_id,
            deleted: false
        })
        
        res.render("admin/page/accounts/detail", {
            pageTitle: "Chi tiết tài khoản",
            account: account,
            role: role
        })
    }
    catch(error){
        req.flash("error", "Không tìm thấy tài khoản!")
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}

//[PATCH] admin/accounts/change-status/:id/:status
module.exports.changeStatus = async (req, res) => { 
    try {
        await Account.updateOne({_id: req.params.id}, {status: req.params.status})
        req.flash("success", "Cập nhật trạng thái tài khoản thành công!")
    } catch (error) {
        req.flash("error", "Cập nhật trạng thái tài khoản thất bại!")
    }

    res.redirect(`back`)
}