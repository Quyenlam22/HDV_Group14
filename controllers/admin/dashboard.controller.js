const Product = require("../../models/product.model")

module.exports.dashboard = async (req, res) => {
    let find = {
        status: "active",
        deleted: false
    }

    const records = await Product.find(find)
                            .sort({sold: "desc"})
                            .limit(5)

    let objectProducts = {
        revenue: 0,
        sold: 0
    }
    records.forEach(record => {
        objectProducts.revenue += ((record.price * (100 - record.discountPercentage) / 100) * record.sold)
        objectProducts.sold += record.sold
    });
    objectProducts.revenue = objectProducts.revenue.toFixed(1)

    res.render("./admin/page/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        records: records,
        objectProducts: objectProducts
    })
}