module.exports.index = (req, res) => {
    res.render("client/page/products", {
        pageTitle: "Danh sách snar phẩm"
    })
}