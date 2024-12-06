module.exports.index = async (req, res) => {
    res.render('client/page/checkout/index.pug', {
        pageTitle: "Tiến hành thanh toán"
    })
}