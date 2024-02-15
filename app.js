
//requirements
require('dotenv').config()//env config 

const express = require('express')
const bcrypt = require('bcryptjs')
const epressLayout = require('express-ejs-layouts')
const session = require('express-session')
const connectDB = require('./server/config/db')
const passport = require('passport')
const MongoStore=require('connect-mongo')
//const mondoDBsession = require('connect-mongodb-session')(session)
//method-override
const methodOverride = require('method-override') 
//flash mesages
const flash = require('express-flash')
//const AuthSchema = require('./server/model/authicate')



//configure express app
const app = express()
const port = 5000 || process.env.PORT

//passport middleware
app.use(session({ 
    secret: 'Enter your secret key',
    resave: false, 
    saveUninitialized: true,
    store:MongoStore.create({
        mongoUrl:process.env.URI
    })

  })); 
app.use(passport.initialize())
app.use(passport.session())

connectDB()
//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'));

//serves static files in express
app.use(express.static('public'))


//engines   
app.use(epressLayout)
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

//routes 
//first route 
app.use('/', require('./server/routes/customer'))
app.use('/add', require('./server/routes/customer'))

//auth route
app.use('/', require('./server/routes/auth'))

app.get('/', async (req, res) => {
    res.render('Users/auth')
})
app.get('/register', async (req, res) => {
    res.render('Users/register')
})

//404 route
app.get('*', (req, res) => {
    res.status(404).render('404page')
})



app.listen(port, () => {
    console.log(`App connected on : ${port}`)
})
 