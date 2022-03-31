const User = require('../models/User')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//handle all operations related to login, logout, register
const registerView = (req, res) => {
    res.render("register", {

    })
}

const loginView = (req, res) => {
    res.render("login", {
        
    })
}

//post request that handles Register
const registerUser = (req, res) => {
    const { name, email, password, confirm } = req.body;
    if( !name || !email || !password || !confirm){
        console.log("Fill empty fields");
    }
    if(password !== confirm){
        console.log("Password must match")
    } else {
        User.findOne({email: email}).then((user) => {
            if(user){
                console.log("Email exists!!!")
                res.render("register", {
                    name,
                    email,
                    password,
                    confirm
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                })
                //password hashing
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err
                        newUser.password = hash
                        newUser.save().then(
                            res.redirect('/login')
                        ).catch((err) => console.log(err))
                    })
                )
            }
        })
    }
}

const loginUser = (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        console.log("Parameters are missing!")
        res.render('login',{
            email,
            password
        })
    }else{
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res)
    }
}

module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser
}