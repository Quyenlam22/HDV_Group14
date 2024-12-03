const express = require("express")
const route = express.Router()

const controller = require("../../controllers/client/auth.controller")
const validate = require("../../validates/client/auth.validate")
route.get('/login', controller.login)

route.post('/login', validate.loginPost, controller.loginPost)

route.get('/register', controller.register)

route.post('/register', validate.signinPost, controller.registerPost)

route.get('/logout', controller.logout)

module.exports = route