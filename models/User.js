const mongoose = require('mongoose')
const bcrpt  = require('bcrypt')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:6
    }
},{timestamps:true})

UserSchema.methods.genHash = function(pass) {
    return bcrpt.hashSync(pass,bcrpt.genSaltSync(10))
}
UserSchema.methods.compareHash = function(pass,hash) {
    return bcrpt.compareSync(pass,hash)
}

const User = mongoose.model("User",UserSchema)
module.exports = User