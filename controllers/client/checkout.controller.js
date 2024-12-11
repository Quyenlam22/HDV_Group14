const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

const productHelper = require("../../helpers/client/priceNewProduct")

module.exports.index = async (req, res) => {
    const cartId = req .cookies.cartId

    const cart = await Cart.findOne({
        _id: cartId
    })

    if(cart.products.length > 0){
        for (const product of cart.products) {
            const productId = product.product_id
            const productInfo = await Product.findOne({
                _id: productId
            }).select("title image slug price discountPercentage")
        
            productInfo.priceNew = productHelper.priceNewProduct(productInfo)

            product.productInfo = productInfo

            product.totalPrice = productInfo.priceNew * product.quantity
        }
    }

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

    res.render('client/page/checkout/index.pug', {
        pageTitle: "Tiến hành thanh toán",
        cartDetail: cart
    })
}