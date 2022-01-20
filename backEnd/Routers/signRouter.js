const express = require('express')
const router = express.Router()
const SignUp = require('../Models/signModel')
const  authenticate = require("../Middleware/verifyToken")

//for get user and pagination 
router.get('/getuser/page=:pagenumber/:sort', async (req, res) => {
    try {
        const page = req.params.pagenumber
        const sort = req.params.sort
        const limit = 10

        // ==== Aggregation ======
        const aggregateQuery = []

        if(sort === 'asc' || sort === 'dsc'){
            aggregateQuery.push(
                {$sort : {name: sort === "asc" ? 1 : -1}}
            )
        }
        else if(sort !== "getdata") {
            aggregateQuery.push(
                { 
                    $match : {
                        $or : [
                            {name : RegExp(sort, 'i')},
                            {salary : parseInt(sort)}
                        ]
                    }
                }
            )
        }
            aggregateQuery.push(
                {$skip: (page - 1) * limit},
                {$limit: limit},
            )
       
        const getUserData = await SignUp.aggregate([aggregateQuery])
        res.send(getUserData) 
    } catch (err) { 
        res.send('Error' + err)
    }
})

//For Register User
router.post('/signup', async (req, res) => {
    console.log('post method call');
    const userData = new SignUp({
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
        cpwd: req.body.cpwd,
        phone: req.body.phone,
        salary: req.body.salary,
        salarySecond: req.body.salarySecond,
        salaryThird: req.body.salaryThird,
        token: req.body.token
    })
    try {
        const userObj = await userData.save()
        console.log("userobj",userObj);
        res.send(userObj)
    } catch (err) {
        res.send("Error" + err)
        console.log(err);
    }
})

//for Login User
router.post('/signin', async (req, res) => {
    console.log("hello");
    try {
        let token;        
        const { email } = req.body;

        const loginUser = await SignUp.findOne({ email: email });
        console.log(loginUser);

        if (loginUser) {
            
            // for token
            token = await loginUser.generateToken();
            console.log(token);

            //store the token in cookie
            res.cookie("userLogin", token, {
                maxAge : 3600,
                httpOnly: true
            })
            res.send({ message: "Login Successfully" });
        } else {
            console.log("Invalid User");
            res.send({ error: "Invalid User"});
        }
    } catch (err) {
        console.log(err);
    }
})

//for edit User
router.get('/signup/:id', async (req, res) => {
    try {
        const editData = await SignUp.findById(req.params.id)
        res.send(editData)
    } catch (err) {
        res.send('Error' + err)
        console.log(err);
    }
})

//for update User
router.put('/signup/:id', async (req, res) => {
    console.log("Update");
    try {
        const updateUser = await SignUp.findByIdAndUpdate(req.params.id);
        updateUser.name = req.body.name
        updateUser.email = req.body.email
        updateUser.pwd = req.body.pwd
        updateUser.cpwd = req.body.cpwd
        updateUser.phone = req.body.phone
        updateUser.salary = req.body.salary
        updateUser.salarySecond = req.body.salarySecond
        updateUser.salaryThird = req.body.salaryThird

        const editObj = await updateUser.save()
        res.send(editObj)
        console.log(editObj)
    } catch (err) {
        res.send('Error' + err)
    }
})

//for Delete User
router.delete('/signup/:id', async (req, res) => {
    try {
        res.clearCookie("userLogin")
        const deleteReg = await SignUp.findByIdAndRemove(req.params.id);
        res.send(deleteReg);
    } catch (err) {
        res.send('Error' + err)
    }
})

//for dashbord authentication
router.get('/deshborad',authenticate,(req, res) => {
    res.send(req.authenticateUser);
})

router.get('/logout', authenticate, async (req, res) => {
    console.log("hello");
    try {
        //Remove token 
        
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((elem) => {
            return elem.token !== req.token
        })
        console.log(" req.authenticateUser.Token", req.authenticateUser.Tokens);

        //clear cookie
        res.clearCookie('userLogin');
        await req.authenticateUser.save();
        res.send("User Logout");
    }
    catch (err) {
        console.log('error');
        res.send(err);
    }
})
module.exports = router