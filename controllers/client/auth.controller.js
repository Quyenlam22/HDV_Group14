const User = require("../../models/user.model")
const Cart = require("../../models/cart.model")
const ForgotPassword = require("../../models/forgot-password.model")

const md5 = require("md5")

const generate = require("../../helpers/admin/generate")
const sendMailHelper = require("../../helpers/client/sendMail")

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

        const cart = await Cart.findOne({
            user_id: user.id
        })

        if (!cart) {
            await Cart.updateOne({
                _id: req.cookies.cartId,
            }, {
                user_id: user.id
            })
        } else {
            res.cookie("cartId", cart.id)
        }

        res.cookie("tokenUser", user.tokenUser, {
            maxAge: 12 * 60 * 60 * 1000
        }) //12 Hours
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
    try {
        const emailExist = await User.findOne({
            email: req.body.email,
            deleted: false
        })

        if (emailExist) {
            req.flash("error", `Email ${req.body.email} đã tồn tại!`)
            res.redirect('back')
            return
        }

        if (req.body.password != req.body.confirm_password) {
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
    } catch (e) {
        req.flash("error", "Thêm tài khoản thất bại!")
        res.redirect("back")
    }
}

// [GET] /auth/logout
module.exports.logout = (req, res) => {
    res.clearCookie("cartId")
    res.clearCookie("tokenUser")
    req.flash("success", "Thoát tài khoản thành công!")
    res.redirect(`back`)
}

// [GET] /auth/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render('client/page/auth/forgot-password.pug', {
        pageTitle: "Lấy lại mật khẩu",
    })
}

// [POST] /auth/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            req.flash("error", "Không tìm thấy người dùng!")
            res.redirect("back")
            return
        }

        const otp = generate.generateRandomNumber(6)
        const objectForgotPassword = {
            email: req.body.email,
            otp: otp,
            expireAt: Date.now()
        }

        const forgotPassword = new ForgotPassword(objectForgotPassword)
        await forgotPassword.save()

        const subject = "Mã OTP xác minh lấy lại mật khẩu"
        const html = `Mã OTP xác minh của bạn là: <b>${otp}</b>. Thời hạn sử dụng là 3 phút!`
        sendMailHelper.sendMail(req.body.email, subject, html)

        res.redirect(`/auth/password/otp?email=${req.body.email}`)
    } catch (e) {
        req.flash("error", "Có lỗi trong quá trình gửi email!")
        res.redirect("back")
    }
}

// [GET] /auth/password/otp
module.exports.otpPassword = async (req, res) => {
    res.render('client/page/auth/otp-password.pug', {
        pageTitle: "Nhập mã OTP",
        email: req.query.email
    })
}

// [POST] /auth/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    try {
        const email = req.body.email
        const otp = req.body.otp

        const checkUser = await User.findOne({
            email: req.body.email
        })

        if (!checkUser) {
            req.flash("error", "Kiểm tra lại email của bạn trên thanh URL!")
            res.redirect("back")
            return
        }

        const result = await ForgotPassword.findOne({
            email: email,
            otp: otp
        })
        if (!result) {
            req.flash("error", "OTP không hợp lệ!")
            res.redirect("back")
            return;
        }

        const user = await User.findOne({
            email: email
        })

        res.redirect(`/auth/password/reset?email=${email}`)
    } catch (e) {
        req.flash("error", "Có lỗi trong quá trình gửi OTP!")
        res.redirect("back")
    }
}

//[GET] auth/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/page/auth/reset-password", {
        pageTitle: "Đặt lại mật khẩu",
        email: req.query.email
    })
}

//[POST] auth/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    try {
        const password = req.body.password

        const user = await User.findOne({
            email: req.body.email
        })

        if (!user) {
            req.flash("error", "Kiểm tra lại email của bạn trên thanh URL!")
            res.redirect("back")
            return
        }
        await User.updateOne({
            email: req.body.email
        }, {
            password: md5(password)
        })

        req.flash("success", " Cập nhật mật khẩu thành công!")
        res.redirect('/auth/login')
    } catch (e) {
        req.flash("error", "Có lỗi trong quá trình đặt lại mật khẩu!")
        res.redirect("back")
    }
}