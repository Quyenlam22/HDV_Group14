const User = require("../../models/user.model")

module.exports.auth = async (req, res, next) => {
    if(!req.cookies.tokenUser){
        req.flash("error", "Vui lòng đăng nhập để đặt hàng!")
        res.redirect(`/auth/login`)
    }
    else{
        next()
    }
}

module.exports.checkUser = async (req, res, next) => {
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser
        }).select("-password")
        if(user){
            res.locals.userClient = user
        }
        next()
    }
    else{
        next()
    }
}