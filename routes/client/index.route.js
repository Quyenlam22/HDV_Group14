const homeRoutes = require("./home.route")
const productRoutes = require("./product.route")
const authRoutes = require("./auth.route")
const cartRoutes = require("./cart.route")

const authMiddleware = require("../../middlewares/client/auth.middleware")
const categoryMiddleware = require("../../middlewares/client/category.middleware")

module.exports = (app) => {
    app.use(authMiddleware.checkUser)
    app.use(categoryMiddleware.category)

    app.use('/', homeRoutes)

    app.use('/products', productRoutes)

    app.use('/auth', authRoutes)

    app.use('/cart', authMiddleware.auth, cartRoutes)

}
