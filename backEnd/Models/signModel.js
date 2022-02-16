const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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
    files : [
        {
            filename: {
                type: String  
            },
            filepath: {
                type: String 
            },
            public_id: {
                type: String
            },
            filetype: {
                type: String 
            }
        }
    ],
    Token: [
        {
            token: {
                type : String,
                required : true
            }
        }
    ]
})


// =============== bcrypt password =============

// signUpSchema.pre('save', async function(next){
//     if(this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//         this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);
//     }
//     next();
// })


// =========== Generate Token ==============
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
