const Product = require("../../models/product.model")
const TimeLogin = require("../../models/time-log.model")
const Account = require("../../models/account.model")
const Role = require("../../models/roles.model")
const Chart = require("../../models/chart.model")

module.exports.dashboard = async (req, res) => {
    let find = {
        status: "active",
        deleted: false
    }

    const records = await Product.find(find)
                            .sort({sold: "desc"})
                            // .limit(5)

    let objectProducts = {
        revenue: 0,
        sold: 0
    }
    records.forEach(record => {
        objectProducts.revenue += ((record.price * (100 - record.discountPercentage) / 100) * record.sold)
        objectProducts.sold += record.sold
    });
    objectProducts.revenue = objectProducts.revenue.toFixed(1)

    //Time Login
    const timeLogs = await TimeLogin.find().limit(5).sort({createdAt: "desc"})

    for (const timeLog of timeLogs) {
        const account = await Account.findOne({
            _id: timeLog.account_id
        })
        const role = await Role.findOne({
            _id: account.role_id
        })
        timeLog.accountFullName = account.fullName
        timeLog.accountRoleTitle = role.title
    }

    const charts = await Chart.find()

    let listRevenue = []
    let listSold = []

    for (const chart of charts) {
        listRevenue.push(chart.revenue)
        listSold.push(chart.sold)
    }

    res.render("./admin/page/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        records: records.slice(0, 5),
        objectProducts: objectProducts,
        timeLogs: timeLogs,
        listRevenue: JSON.stringify(listRevenue.slice(-7)),
        listSold: JSON.stringify(listSold.slice(-7))
    })
}