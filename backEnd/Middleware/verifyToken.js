const jwt = require('jsonwebtoken');
const SignUp = require('../Models/signModel')

const Authenticate = async (req, res, next) => {
    try {
        //get cookie
        const token = req.cookies.jwtLogin;
        console.log('token Generate', token);

        //verify token 
        const verifyToken = jwt.verify(token, process.env.Token_SECRET)
        
        //find the authenticate User
        const authenticateUser = await SignUp.findOne({ _id: verifyToken._id, "Tokens.token": token })

        if (!authenticateUser) {
            return res.send("You are Not Authenticate")
        }
        req.token = token;
        req.authenticateUser = authenticateUser;
        req.userId = authenticateUser._id;
        console.log(req.authenticateUser);

        next();
    }
    catch (err) {
        res.send("Invalid Token User")
        console.log(err)
    }

}

module.exports = Authenticate;