module.exports.forgotPassword = async (req, res, next) => {
    if(!req.cookies.tokenForgot){
        req.flash("error", "Bạn không có quyền truy cập link này!")
        res.redirect(`back`)
    }
    else{
        next()
    }
}