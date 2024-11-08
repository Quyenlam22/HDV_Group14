const express = require("express")
const route = express.Router()

//Upload Image
const multer  = require('multer')
const storageMulter = require("../../helpers/admin/storageMulter")
const upload = multer({ storage: storageMulter() })

const controller = require("../../controllers/admin/accounts.controller")
const validate = require("../../validates/admin/account.validate")

route.get("/", controller.index)

route.get("/create", controller.create)

route.post("/create", upload.single('avatar'), validate.createPost, controller.createPost)

module.exports = route