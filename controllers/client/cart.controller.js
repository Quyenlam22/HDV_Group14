// [GET] /carts
module.exports.index = (req, res) => {
    res.render('client/page/cart/index.pug', {
        pageTitle: "Giỏ hàng",
    })
}

// [POST] /carts/add/:productId
module.exports.addPost = (req, res) => {
    res.send("ok")
}
