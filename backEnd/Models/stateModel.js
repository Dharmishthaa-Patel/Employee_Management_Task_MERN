const mongoose = require('mongoose')


const stateSchema = new mongoose.Schema({
    
    state:{
        stateId : { type : Number, required : true},
        countryId : { type : Number, required : true},
        stateName : { type : String, required : true}
    }
})

module.exports = mongoose.model('State', stateSchema)