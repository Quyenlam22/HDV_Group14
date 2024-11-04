const express = require("express")
const route = express.Router()

//Upload Image
const multer  = require('multer')
const storageMulter = require("../../helpers/admin/storageMulter")
const upload = multer({ storage: storageMulter() })

const validate = require("../../validates/admin/product.validate")
const productController = require("../../controllers/admin/product.controller")

route.get("/", productController.index)

route.patch("/change-status/:id/:status", productController.changeStatus)

route.patch("/delete-item/:id", productController.deleteItem)

route.patch("/change-multi", productController.changeMulti)

route.get("/create", productController.create)

route.post("/create", upload.single('image'), validate.createPost, productController.createPost)

route.get("/edit/:id", productController.edit)

route.patch("/edit/:id", upload.single('image'), validate.createPost, productController.editPatch)


module.exports = route