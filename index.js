const express = require('express')
const methodOverride = require('method-override')
const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')

//Flash
const flash = require('express-flash')
const cookieParser = require("cookie-parser")
const session = require("express-session")

//Body Parser
const bodyParser = require('body-parser')

//Code hidden Github
require('dotenv').config()

// pathMCE
const path = require("path")

//Moment
const moment = require("moment")

const app = express()
const port = process.env.PORT

//Connect database
const database = require("./config/database")
database.connect()

//Folder Views
// app.set('views', './views')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// app.set('view engine', 'jade');

// Folder Public
app.use(express.static(`${__dirname}/public`))

//Method Override
// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

//Flash message
app.use(cookieParser('ABCDEF'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const systemConfig = require("./config/system")
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.locals.moment = moment

//Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

route(app)
routeAdmin(app)

app.listen(port, () => {
    console.log(`Example listening on port ${port}`)
})