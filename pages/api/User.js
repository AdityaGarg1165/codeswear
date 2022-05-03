const { default: mongoose } = require("mongoose")
const mongo = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

const schema = new mongo.Schema({
    email:{
    type:String,
    email:String,
    password:String
},
    password:{
    type:String,
    email:String,
    password:String
}
})
mongo.models = {}
const User = new mongo.model("Users",schema)
module.exports = User