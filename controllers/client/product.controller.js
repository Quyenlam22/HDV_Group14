const Product = require("../../models/product.model")
const ProductCategory = require("../../models/products-category.model")
const searchHelper = require("../../helpers/client/search")

const productsHelper = require("../../helpers/client/priceNewProduct")

// [GET] /products
module.exports.index = async (req, res) => {
    let find = {
        status: "active",
        deleted: false
    }

    // Search
    const objectSearch = searchHelper(req.query)
    if(objectSearch.keyword){
        find.title = objectSearch.regex
    }

    // Call database 
    const products = await Product.find(find)
                            .sort({position: "asc"})
    
    const newProducts = productsHelper.priceNewProducts(products)

    res.render("client/page/products", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts,
        keyword: objectSearch.keyword,
    })
}

// [GET] /products/detail/:id
module.exports.detail = async (req, res) => {
    try{
        let find = {
            deleted: false,
            // slug: req.params.slugProduct,
            _id: req.params.id,
            status: "active"
        }
    
        const product = await Product.findOne(find)

        if(product.product_category_id){
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                deleted: false
            })
            product.category = category
        }

        product.priceNew = productsHelper.priceNewProduct(product)
    
        res.render(`client/page/products/detail`, {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        })
    }catch(error){
        req.flash("error", "Không tìm thấy sản phẩm!")
        res.redirect(`/products`)
    }
}