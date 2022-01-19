const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const signUpSchema = new mongoose.Schema ({

    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    pwd:{
        type : String,
        required : true
    },
    cpwd:{
        type : String,
        required : true
    },
    phone:{
        type : Number,
        required : true
    },
    salary:{
        type : Number,
        required : true
    },
    salarySecond:{
        type : Number,
        required : true
    },
    salaryThird:{
        type : Number,
        required : true
    },
    Tokens : [
        {
            token : {
                type : String,
                required : true
            },
        }
    ]
});

//generate token
signUpSchema.methods.generateToken = async function() {
    try{
        let token = jwt.sign({_id: this._id}, process.env.TOKEN_SECRET);
        this.Tokens = this.Tokens.concat({ token })

        await this.save();
        return token;
    } catch(err) {
        console.log("Error",err)
    }
}

module.exports = mongoose.model('Signup',signUpSchema);
