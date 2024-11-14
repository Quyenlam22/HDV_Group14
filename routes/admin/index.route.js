const dashboardRouter = require("./dashboard.route")
const productRouter = require("./product.route")
const productCategoryRouter = require("./products-category.route")
const rolesRouter = require("./roles.route")
const accountRouter = require("./accounts.route")
const authRouter = require("./auth.route")

const systemConfig = require("../../config/system")

const authMiddleware = require("../../middlewares/admin/auth.middleware")

module.exports = (app) => {
    app.get(`${systemConfig.prefixAdmin}`, (req, res) => {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    })

    app.use(`${systemConfig.prefixAdmin}/dashboard`, authMiddleware.auth, dashboardRouter)

    app.use(`${systemConfig.prefixAdmin}/products`, authMiddleware.auth, productRouter)

    app.use(`${systemConfig.prefixAdmin}/products-category`, authMiddleware.auth, productCategoryRouter)

    app.use(`${systemConfig.prefixAdmin}/roles`, authMiddleware.auth, rolesRouter)

    app.use(`${systemConfig.prefixAdmin}/accounts`, authMiddleware.auth, accountRouter)

    app.use(`${systemConfig.prefixAdmin}/auth`, authRouter)
}