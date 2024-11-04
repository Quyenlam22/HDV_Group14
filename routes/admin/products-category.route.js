const express = require("express")
const route = express.Router()

//Upload Image
const multer  = require('multer')
const storageMulter = require("../../helpers/admin/storageMulter")
const upload = multer({ storage: storageMulter() })

const validate = require("../../validates/admin/products-category.validate")
const controller = require("../../controllers/admin/products-category.controller")

route.get("/", controller.index)

route.get("/create", controller.create)

route.post("/create", upload.single('image'), validate.createPost, controller.createPost)

module.exports = route