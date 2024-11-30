const User = require("../../models/user.model")

module.exports.auth = async (req, res, next) => {
    if(!req.cookies.token){
        req.flash("error", "Vui lòng đăng nhập để đặt hàng!")
        res.redirect(`/auth/login`)
    }
    else{
        next()
    }
}