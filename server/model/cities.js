const mongoose = require('mongoose')
const citySchema = new mongoose.Schema({
  
      id:Number,
      city:String
  
})


const city = mongoose.model('cities',citySchema)

module.exports =city