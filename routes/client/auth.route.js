const express = require("express")
const route = express.Router()

const controller = require("../../controllers/client/auth.controller")

route.get('/login', controller.login)

route.post('/login', controller.loginPost)

route.get('/register', controller.register)

route.post('/register', controller.registerPost)

module.exports = route