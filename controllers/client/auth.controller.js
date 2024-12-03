const User = require("../../models/user.model")

const md5 = require("md5")

const generate = require("../../helpers/admin/generate")

// [GET] /auth/login
module.exports.login = (req, res) => {
    res.render('client/page/auth/login.pug', {
        pageTitle: "Đăng nhập",
    })
}

// [POST] /auth/login
module.exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await User.findOne({
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

        res.cookie("tokenUser", user.tokenUser, {maxAge: 12*60*60*1000}) //12 Hours
        req.flash("success", "Đăng nhập thành công!")
        res.redirect(`/cart`)
    } catch (error) {
        req.flash("error", "Lỗi tài khoản!")
        res.redirect("back")
    }
}

// [GET] /auth/register
module.exports.register = (req, res) => {
    res.render('client/page/auth/register.pug', {
        pageTitle: "Đăng ký",
    })
}

// [POST] /auth/register
module.exports.registerPost = async (req, res) => {
    try{
        const emailExist = await User.findOne({
            email: req.body.email,
            deleted: false
        })
    
        if (emailExist) {
            req.flash("error", `Email ${req.body.email} đã tồn tại!`)
            res.redirect('back')
            return
        }
    
        if(req.body.password != req.body.confirm_password){
            req.flash("error", "Mật khẩu không khớp!")
            res.redirect('back')
            return
        }
    
        req.body.password = md5(req.body.password)
    
        req.body.tokenUser = generate.generateRandomString(20)
    
        delete req.body.confirm_password
    
        const user = new User(req.body)
        await user.save()
        
        req.flash("success", "Đăng kí tài khoản thành công!")
        res.redirect(`\login`)
    }
    catch(e){
        req.flash("error", "Thêm tài khoản thất bại!")
        res.redirect("back")
    }
}

// [GET] /auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser")
    req.flash("success", "Thoát tài khoản thành công!")
    res.redirect(`back`)
}