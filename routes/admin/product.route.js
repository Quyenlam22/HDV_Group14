const express = require("express")
const route = express.Router()

//Upload Image
const multer  = require('multer')
const storageMulter = require("../../helpers/admin/storageMulter")
const upload = multer({ storage: storageMulter() })

const validate = require("../../validates/admin/product.validate")
const controller = require("../../controllers/admin/product.controller")

route.get("/", controller.index)

route.patch("/change-status/:id/:status", controller.changeStatus)

route.patch("/delete-item/:id", controller.deleteItem)

route.patch("/change-multi", controller.changeMulti)

route.get("/create", controller.create)

route.post("/create", upload.single('image'), validate.createPost, controller.createPost)

route.get("/edit/:id", controller.edit)

route.patch("/edit/:id", upload.single('image'), validate.createPost, controller.editPatch)

route.get("/detail/:id", controller.detail)

module.exports = route