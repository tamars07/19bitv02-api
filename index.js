const express = require('express');
const app = express();
const session = require('express-session')
const PORT = 3000;
const db = require('./db/db')
const passport = require('passport')
const {loginCheck} = require('./auth/passport')
loginCheck(passport)

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'niie-api',
    saveUninitialized: true,
    resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

//Routers
app.use('/', require('./routes/login'))
app.use('/', require('./routes/dashboard'))

app.listen(PORT, console.log("Server is running on port " + PORT));