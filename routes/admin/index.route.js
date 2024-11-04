const dashboardRouter = require("./dashboard.route")
const productRouter = require("./product.route")
const productCategoryRouter = require("./products-category.route")
const rolesRouter = require("./roles.route")

module.exports = (app) => {
    app.use("/admin/dashboard", dashboardRouter)

    app.use("/admin/products", productRouter)

    app.use("/admin/products-category", productCategoryRouter)

    app.use("/admin/roles", rolesRouter)
}