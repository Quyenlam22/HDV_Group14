const Cart = require("../../models/cart.model")
const Product = require("../../models/product.model")

const productHelper = require("../../helpers/client/priceNewProduct")

// [GET] /carts
module.exports.index = async (req, res) => {
    try {
        const cartId = req.cookies.cartId

        const cart = await Cart.findOne({
            _id: cartId
        })

        if(cart.products.length > 0){
            for(const item of cart.products){
                const productId = item.product_id
                const productInfo = await Product.findOne({
                    _id: productId,
                }).select("title image slug price discountPercentage")
                
                productInfo.priceNew = productHelper.priceNewProduct(productInfo)

                item.productInfo = productInfo

                item.totalPrice = productInfo.priceNew * item.quantity 
            }
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0)

        res.render('client/page/cart/index.pug', { 
            pageTitle: 'Giỏ hàng',
            cartDetail: cart
        })
    } catch (error) {
        req.flash("error", "Có lỗi trong quá trình hiển thị sản phẩm!")
        res.redirect(`/cart`)
    }
}

// [POST] /carts/add/:productId
module.exports.addPost = async (req, res) => {
    try {
        const productId = req.params.productId
        const quantity = parseInt(req.body.quantity)
        const cartId = req.cookies.cartId

        const cart = await Cart.findOne({
            _id: cartId
        })

        const existProductInCart = cart.products.find(item => item.product_id == productId)

        if(existProductInCart){
            const quantityNew = quantity + existProductInCart.quantity
            
            await Cart.updateOne({
                _id: cartId,
                'products.product_id': productId
            }, {
                '$set': {
                'products.$.quantity': quantityNew
                }
            })
        } else{
            const objectCart = {
                product_id: productId,
                quantity: quantity
            }

            await Cart.updateOne({ _id: cartId }, {
                $push: { products: objectCart }
            })
        }

        req.flash("success", "Thêm sản phẩm thành công!")
        res.redirect('back')
    }catch(error){
        req.flash("error", "Có lỗi trong quá trình thêm sản phẩm!")
        res.redirect(`/cart`)
    }
}
