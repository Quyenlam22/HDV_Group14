const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")

const systemConfig = require("../../config/system")

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
        console.log(req.body)
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
