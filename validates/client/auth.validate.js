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