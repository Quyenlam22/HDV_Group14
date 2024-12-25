const homeRoutes = require("./home.route")
const productRoutes = require("./product.route")
const authRoutes = require("./auth.route")
const cartRoutes = require("./cart.route")
const orderRoutes = require("./order.route")
const checkoutRoutes = require("./checkout.route")

// const authMiddleware = require("../../middlewares/client/auth.middleware")
const categoryMiddleware = require("../../middlewares/client/category.middleware")
const cartMiddleware = require("../../middlewares/client/cart.middleware")
const authMiddleware = require("../../middlewares/client/auth.middleware")
const orderMiddleware = require("../../middlewares/client/order.middleware")

module.exports = (app) => {
  app.use(authMiddleware.checkUser)
  app.use(categoryMiddleware.category)
  app.use(cartMiddleware.cartId)
  app.use(orderMiddleware.listOrder)

  app.use('/', homeRoutes)

  app.use('/products', productRoutes)

  app.use('/auth', authRoutes)

  // app.use('/cart', authMiddleware.auth, cartRoutes)
  app.use('/cart', cartRoutes)

  app.use('/order', orderRoutes)

  app.use('/checkout', authMiddleware.auth, checkoutRoutes)

}