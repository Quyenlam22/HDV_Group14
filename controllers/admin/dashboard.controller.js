module.exports.dashboard = (req, res) => {
    res.render("./admin/page/dashboard/index.pug", {
        pageTitle: "Trang tổng quan"
    })
}