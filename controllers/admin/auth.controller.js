const Account = require("../../models/account.model")
// const Role = require("../../models/roles.model")
const TimeLogin = require("../../models/time-log.model")

const systemConfig = require("../../config/system")

const md5 = require("md5")

// [GET] /admin/auth/login
module.exports.login = async (req, res) => {
    if(req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    }
    res.render("admin/page/auth/login", {
        pageTitle: "Đăng nhập",
    })
}

// [POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await Account.findOne({
            email: email,
            deleted: false
        })
        if (!user) {
            req.flash("error", "Không tìm thấy tài khoản!")
            res.redirect("back")
            return
        }
        if (user.password != md5(password)) {
            req.flash("error", "Mật khẩu không đúng!")
            res.redirect("back")
            return
        }
        if (user.status == "inactive") {
            req.flash("error", "Tài khoản đã bị khóa!")
            res.redirect("back")
            return
        }

        const newLog = new TimeLogin({
            account_id: user.id,
            createdAt: new Date()
        })
        await newLog.save()

        res.cookie("token", user.token, {maxAge: 12*60*60*1000}) //12 Hours
        req.flash("success", "Đăng nhập thành công!")
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } catch (error) {
        req.flash("error", "Lỗi!")
        res.redirect("back")
    }
}

// [GET] /admin/auth/logout
module.exports.logout = async (req, res) => {
    try{
        res.clearCookie("token")
        req.flash("success", "Đăng xuất thành công!")
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }catch(error){
        req.flash("error", "Lỗi!")
        res.redirect("back")
    }
}