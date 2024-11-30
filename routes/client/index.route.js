const homeRoutes = require("./home.route")
const productRoutes = require("./product.route")
const authRoutes = require("./auth.route")
const cartRoutes = require("./cart.route")

const authMiddleware = require("../../middlewares/client/auth.middleware")

module.exports = (app) => {
    app.use('/', homeRoutes)

    app.use('/products', productRoutes)

    app.use('/auth', authRoutes)

    app.use('/carts', authMiddleware.auth, cartRoutes)

}
