const express = require('express')
const router = express.Router()
const SignUp = require('../Models/signModel')
const  authenticate = require("../Middleware/verifyToken")

//for get user and pagination 
router.get('/getuser/:pagenumber/:sorting', async (req, res) => {
    try {
        
        const page = req.params.pagenumber
        const sorting = req.params.sorting
        const limit = 10

        // ==== Starting Aggregation ======
        const aggregateQuery = []

        if(sorting === "asc" || sorting === "dsc"){
            aggregateQuery.push(
                { $sort : {name: sorting === "asc" ? 1 : -1} }
            )
        }
        else if(sorting !== "user") {
            const searchData = sorting
            aggregateQuery.push(
                { 
                    $match : {
                        $or : [
                            {name : RegExp("^" + searchData, 'i')},
                            {salary : parseInt(searchData)},
                            {salarySecond : parseInt(searchData)},
                            {salaryThird : parseInt(searchData)}
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
    
    const userData = new SignUp({
        name: req.body.name,
        profession: req.body.profession,
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
        res.send(userObj)
    } catch (err) {
        res.send("Error" + err)
    }
})

//for Login User
router.post('/signin', async (req, res) => {
    try {
        let token;        
        const { email } = req.body;

        const loginUser = await SignUp.findOne({ email: email });
    
        if (loginUser) {
            
            // for token
            token = await loginUser.generateToken();

            //store the token in cookie
            res.cookie("userLogin", token, {
                maxAge : 3600,
                httpOnly: true
            })
            res.send({ message: "Login Successfully" });
        } else {
            res.send({ error: "Invalid User"});
        }
    } catch (err) {
        res.send("Error" + err);
    }
})

//for edit User
router.get('/signup/:id', async (req, res) => {
    try {
        const editData = await SignUp.findById(req.params.id)
        res.send(editData)
    } catch (err) {
        res.send('Error' + err)
    }
})

//for update User
router.put('/signup/:id', async (req, res) => {
    try {
        const updateUser = await SignUp.findByIdAndUpdate(req.params.id);
        updateUser.name = req.body.name
        updateUser.profession = req.body.profession
        updateUser.email = req.body.email
        updateUser.pwd = req.body.pwd
        updateUser.cpwd = req.body.cpwd
        updateUser.phone = req.body.phone
        updateUser.salary = req.body.salary
        updateUser.salarySecond = req.body.salarySecond
        updateUser.salaryThird = req.body.salaryThird

        const editObj = await updateUser.save()
        res.send(editObj)
        
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

    try {
        //Remove token 
        req.authenticateUser.Tokens = req.authenticateUser.Tokens.filter((elem) => {
            return elem.token !== req.token
        })

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