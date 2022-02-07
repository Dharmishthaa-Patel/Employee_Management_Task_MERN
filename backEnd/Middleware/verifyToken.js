const jwt = require('jsonwebtoken');
const SignUp = require('../Models/signModel')

const Authenticate = async (req, res, next) => {
    
    try {
        
        // ========== get cookie ============
        const token = req.cookies.jwtLogin;

        // ========== verify token  ===============
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET)

        // ========== find the authenticateuser ============
        const authenticateUser = await SignUp.findOne({ _id: verifyToken._id, "Token.token": token })

        if (!authenticateUser) {
            throw new Error('User not found')
        }
        req.token = token;
        req.authenticateUser = authenticateUser
        req.userId = authenticateUser._id;

        next();
    }
    catch (err) {
        res.send('User Not Found');
        console.log(err)
    }

}

module.exports = Authenticate;