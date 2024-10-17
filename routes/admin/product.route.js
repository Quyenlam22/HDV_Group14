const express = require("express")
const route = express.Router()

const productController = require("../../controllers/admin/product.controller")

route.get("/", productController.index)

route.patch("/change-status/:id/:status", productController.changeStatus)

route.patch("/delete-item/:id", productController.deleteItem)

module.exports = route