const dashboardRouter = require("./dashboard.route")
const productRouter = require("./product.route")
const productCategoryRouter = require("./products-category.route")
const rolesRouter = require("./roles.route")
const accountRouter = require("./accounts.route")
const authRouter = require("./auth.route")

const systemConfig = require("../../config/system")

module.exports = (app) => {
    app.get(`${systemConfig.prefixAdmin}`, (req, res) => {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    })

    app.use(`${systemConfig.prefixAdmin}/dashboard`, dashboardRouter)

    app.use(`${systemConfig.prefixAdmin}/products`, productRouter)

    app.use(`${systemConfig.prefixAdmin}/products-category`, productCategoryRouter)

    app.use(`${systemConfig.prefixAdmin}/roles`, rolesRouter)

    app.use(`${systemConfig.prefixAdmin}/accounts`, accountRouter)

    app.use(`${systemConfig.prefixAdmin}/auth`, authRouter)
}