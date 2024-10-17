const express = require('express')
const methodOverride = require('method-override')
const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

//Code hidden Github
require('dotenv').config()

const app = express()
const port = process.env.PORT

//Connect database
const database = require("./config/database")
database.connect()

//Folder Views
app.set('views', './views')
app.set('view engine', 'pug');

// Folder Public
app.use(express.static("public"))

//Method Override
// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin

route(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})