//mongoose an express module for creating tables in mongoDb
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const authSchema = mongoose.Schema({
    email : {
        type : String
    },
    password:{
        type:String
    },
    username:{
        type:String
    }
})
authSchema.pre('save',async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
authSchema.methods.comparePassword = async function(userPassword){
    const isMatch = bcrypt.compare(userPassword,this.password)
    return isMatch
}
module.exports = mongoose.model('Auth',authSchema)