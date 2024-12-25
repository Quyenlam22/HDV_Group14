const express = require("express")
const route = express.Router()

const forgotPasswordMiddleware = require("../../middlewares/client/forgotPassword.middleware")

const controller = require("../../controllers/client/auth.controller")
const validate = require("../../validates/client/auth.validate")

route.get('/login', controller.login)

route.post('/login', validate.loginPost, controller.loginPost)

route.get('/register', controller.register)

route.post('/register', validate.signinPost, controller.registerPost)

route.get('/logout', controller.logout)

route.get('/password/forgot', controller.forgotPassword)

route.post('/password/forgot', validate.forgotPasswordPost, controller.forgotPasswordPost)

route.get('/password/otp', controller.otpPassword)

route.post('/password/otp', validate.otpPasswordPost, controller.otpPasswordPost)

route.get('/password/reset', forgotPasswordMiddleware.forgotPassword, controller.resetPassword)

route.post('/password/reset', forgotPasswordMiddleware.forgotPassword, validate.resetPasswordPost, controller.resetPasswordPost)

module.exports = route