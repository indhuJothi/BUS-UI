const mongoose = require('mongoose')
const busSchema = new mongoose.Schema({
    from : String,
    to:String,
    busno:String,
    busname:String,
    fare:Number,
    type:String,
    NoOfSeats:Number,
    button:Boolean
    
})

const Buses =mongoose.model('buses',busSchema)

module.exports=Buses