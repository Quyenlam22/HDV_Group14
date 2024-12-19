module.exports.loginPost = (req, res, next) => {
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email!")
        res.redirect("back")
        return
    }
    if(!req.body.password){
        req.flash("error", "Vui lòng nhập mật khẩu!")
        res.redirect("back")
        return
    }
    next()
}

module.exports.signinPost = (req, res, next) => {
    if(!req.body.username){
        req.flash("error", "Vui lòng nhập username!")
        res.redirect("back")
        return
    }
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email!")
        res.redirect("back")
        return
    }
    if(!req.body.password){
        req.flash("error", "Vui lòng nhập mật khẩu!")
        res.redirect("back")
        return
    }
    if(!req.body.phone){
        req.flash("error", "Vui lòng nhập phone!")
        res.redirect("back")
        return
    }
    next()
}

module.exports.forgotPasswordPost = (req, res, next) => {
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email!")
        res.redirect("back")
        return
    }
    next()
}

module.exports.otpPasswordPost = (req, res, next) => {
    if(!req.body.email){
        req.flash("error", "Vui lòng nhập email!")
        res.redirect("back")
        return
    }
    if(!req.body.otp){
        req.flash("error", "Vui lòng nhập mã OTP!")
        res.redirect("back")
        return
    }
    next()
}

module.exports.resetPasswordPost = (req, res, next) => {
    if(!req.body.password){
        req.flash("error", "Vui lòng nhập mật khẩu!")
        res.redirect("back")
        return
    }
    if(!req.body.confirmPassword){
        req.flash("error", "Vui lòng xác nhận mật khẩu!")
        res.redirect("back")
        return
    }
    if(req.body.password != req.body.confirmPassword){
        req.flash("error", "Mật khẩu không khớp!")
        res.redirect("back")
        return
    }
    next()
}