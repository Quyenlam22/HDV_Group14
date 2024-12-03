const ProductCategory = require("../../models/products-category.model")

const createTreeHelper = require("../../helpers/admin/createTree")

module.exports.category = async (req, res, next) => {
    const productCategory = await ProductCategory.find({
        deleted: false
    })

    const newProductCategory = createTreeHelper.createTree(productCategory)

    res.locals.layoutProductCategory = newProductCategory
    next()
}