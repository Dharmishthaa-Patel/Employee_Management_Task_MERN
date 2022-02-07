const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({

    city : {
        cityId : { type : Number, required : true },
        stateId : { type : Number, required : true },
        cityName : { type : String, required : true }
    }
})

module.exports = mongoose.model('City', citySchema)