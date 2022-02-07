const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// ============ create a schema ==============

const signUpSchema = new mongoose.Schema({

    name: {
        type : String,
        required : true
    },
    profession: {
        type : String,
        required : true
    },
    email: {
        type : String, 
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true
    },
    confirmpassword: {
        type : String,
        required : true
    },
    phone: {
        type : Number, 
        required : true
    },
    salary1: {
        type : Number,
        required : true
    },
    salary2: {
        type : Number,
        required : true
    },
    salary3: {
        type : Number,
        required : true
    },
    
    countryId: {
        type : mongoose.Types.ObjectId, 
        ref : 'Country',
        required : true
    },
    stateId: {
        type : mongoose.Types.ObjectId, 
        ref : 'State',
        required : true
    },
    cityId: {
        type : mongoose.Types.ObjectId, 
        ref : 'City',
        required : true
    },
    Token: [
        {
            token: {
                type : String,
                required : true
            }
        }
    ]
})

//GENERATE TOKEN
signUpSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.TOKEN_SECRET);
        this.Token = this.Token.concat({ token });

        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('Employee',signUpSchema);
