const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/rtc")
const userSchema = mongoose.Schema({
    photo:{
     type:String, 
      default:"def.jpg"
    },
    createdAt:{
      type:Date,
      default: Date.now
    }
})

module.exports = mongoose.model("user",userSchema)