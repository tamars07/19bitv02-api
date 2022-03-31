const bcrypt = require('bcryptjs')
LocalStrategy = require('passport-local').Strategy

const User = require('../models/User')

const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
            //check user info
            User.findOne({email: email})
                .then((user) => {
                    if(!user){
                        console.log('Email or Password is incorrect!')
                        return done();
                    }
                    //compare password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if(error) throw error
                        if(isMatch){
                            return  done(null, user);
                        }else{
                            console.log('Email or Password is incorrect!')
                            return done();
                        }
                    })
                })
                .catch((error) => console.log(error))
        })
    )

    passport.serializeUser((user,done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id,done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        })
    })
}

module.exports = {
    loginCheck
}