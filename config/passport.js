const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user)
    })
    passport.deserializeUser(function (user, done) {
        done(null, user)
    })
    passport.use(new LocalStrategy({
        usernameField:"email",
        passwordField:"password"
    },
    (usernameField,passwordField,done) => {
       User.findOne({email:usernameField} ,function(err,doc){
           if(err) {done(err)}
           else {
            if(doc) {
                let valid = doc.compareHash(passwordField,doc.password)
                if(!valid) {
                    done(null,false)
                } else {
                    done(null, doc)
                }
            } else {
                done(null,false)
            }
           }
           
       })
    }))


    
    // const varifyingCallback = (username, password, done) => {
    //     await User.findOne({ email: user }).then(user => {
    //         if (!user) { return done(null, false) }
    //         let valid = user.compareHash(password, user.password)
    //         if (valid) {
    //             return done(null, user)
    //         } else {
    //             return done(null, false)
    //         }

    //     })
    //         .catch(err => {
    //             done(err)
    //         })

    // }
    
}