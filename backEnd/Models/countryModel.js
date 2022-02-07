const mongoose = require('mongoose')


const countrySchema = new mongoose.Schema({
    
    country : {
        countryId : { type : String, required : true},
        countryName : { type : String, required : true}
    }
})

module.exports = mongoose.model('Country', countrySchema)