const express = require('express')
const router = express.Router()
const Employee = require('../Models/signModel')
const Country = require('../Models/countryModel')
const State = require('../Models/stateModel')
const City = require('../Models/cityModel')
const authenticate = require("../Middleware/verifyToken")
const cloudinary = require('../UploadFile/cloudinary')
const upload = require('../UploadFile/multer')
const path = require('path')


// =============== Upload File ================
router.post('/uploadFile',authenticate, upload.array('multi-files'), async (req,res) => {
    try {   

        const files = req.files

        for (const file of files) {
            const type = path.extname(file.originalname)
            const uploadFiles = await cloudinary.uploader.upload(file.path, { resource_type: 'raw' })

            const File = {
                filename: file.originalname,
                filepath: uploadFiles.secure_url,
                public_id: uploadFiles.public_id,
                filetype: type
            }

            //========== Push UploadFile in Employee Collection ========
            await Employee.updateOne({ email: req.authenticateUser.email }, 
                                     { $push: { files: File } })
        }

        // ========= For Loading ========
        const isLoading = false

        // ========= Send Res ===========
        res.send({ msg: "File  Uploaded Succeessfully ", isLoading })

    } catch (err) {
        console.log(err)
    }
})

// =============== GetList Of Upload file ============
router.get('/getUploadFile',authenticate, async (req,res) => {
    try{

        // ============ Pagination ==========
        const page = req.query.page
        const limit = 5
        const skip = (page - 1) * limit


        // ============ get Upload file List of authenticate user
        const totalFiles = req.authenticateUser.files
        console.log("totalFiles",totalFiles)


        // =========== Count Total Pages ============= 
        let totalPage = Math.ceil(totalFiles.length/limit)
        console.log("totalPage",totalPage)

        const aggregateQuery = []
    
    
        aggregateQuery.push(
            {
                $match : {
                    files : req.authenticateUser.files
                }
            },
            {
                $project: {
                    _id: 0, GetFiles: {
                        $slice: ["$files", skip, limit]
                    },
                }
            }
        )
        const uploadData = await Employee.aggregate([aggregateQuery])
        console.log("uploadData",uploadData);
        
        // =========== Send Res ==========
        res.send({uploadData, totalPage})

    } catch (err) {
        console.log(err);
    }
})

// ============= Delete Upload file ==========
// router.delete('/deleteUploadFile',authenticate, async(req,res) => {
//     try{

//         const deleteFile = await cloudinary.uploader.destroy(req.query.id, {resource_type: "raw"});
//         log("DeleteFile", deleteFile)

//         await Employee.updateOne(
//             { email : req.authenticateUser.email},
//             { $pull : { 
//                 files : { 
//                     public_id : req.query.id
//                 }}
//             }
//         )

//         res.send({msg: "delete successfully"})

//     } catch (err) {
//         console.log(err);
//     }
// })

router.delete('/deleteUploadFile',authenticate, async(req,res) => {
    try{

        const deleteFile = await cloudinary.uploader.destroy(req.query.id, {resource_type: "raw"});
        console.log("DeleteFile", deleteFile)

        await Employee.updateOne(
            { email : req.authenticateUser.email},
            { $pull : { 
                files : { 
                    public_id : req.query.id
                }}
            }
        )

        res.send({msg: "delete successfully"})

    } catch (err) {
        console.log(err);
    }
})

// ============= Check Cookie ==========
router.get('/checkCookie', async (req,res) => {
    try{

        if(req.cookies.jwtLogin) {

            const loginStatus = true
            res.send({loginStatus})
            
        } else {

            const loginStatus =false
            res.send({loginStatus})

        }
    } catch (err) {
        console.log(err);
    }
})

// ============ Get User Data ==================
router.get('/getUser',authenticate, async (req, res) => {
    try {
        
        const { page, sort, Request } = req.query
        const limit = 5
        let skip = (page - 1) * limit;
        const LoginUser = req.authenticateUser
        

        // ========= Start Aggregation ===========
        const aggregateQuery = []
        
        // ============= Join Collection ================= 
        
        aggregateQuery.push(
            {
                $lookup: {
                    from: "countries",
                    localField: "countryId",
                    foreignField: "_id",
                    as: "country"
                }
            }
        )
        aggregateQuery.push(
            {
                $lookup: {
                    from: "states",
                    localField: "stateId",
                    foreignField: "_id",
                    as: "state"
                }
            }
        )            
        aggregateQuery.push(
            {
                $lookup: {
                    from: "cities",
                    localField: "cityId",
                    foreignField: "_id",
                    as: "city"
                }
            }
        )
        if(Request === ""){

            // ============== Count Total Documents =============
            const total = await Employee.countDocuments({});
            
            //=============== Count Total Pages ==================
            let totalPage = Math.ceil(total/limit);

            // ============ Sorting and Pagination =============
            aggregateQuery.push(
                {$sort: { name : sort === "descending" ? -1 : 1}},
                { $skip: skip },
                { $limit: limit }  
            )
            
            const empData = await Employee.aggregate([aggregateQuery]);
            res.send({empData, totalPage, LoginUser});   
        }
        
        // ============== Searching =============
        else if(Request !== ""){

            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { "name": RegExp("^" + Request, "i") },
                            { "phone": parseInt(Request) },
                            { "profession": RegExp("^" + Request, "i") },
                            { "email": RegExp("^" + Request, "i") },                            
                            { "country.countryName": RegExp("^" + Request, "i") },
                            { "state.stateName": RegExp("^" + Request, "i") },
                            { "city.cityName": RegExp("^" + Request, "i") }   
                        ]   
                    }
                },    
            )
                        
            const matchUser = await Employee.aggregate([aggregateQuery]);
                
            // =========== Count Total Page =============
            let totalPage = Math.ceil(matchUser.length/limit);
            
            // ========== Sorting And Pagination =========
            aggregateQuery.push(
                {$sort: { name : sort === "descending" ? -1 : 1}},
                { $skip: skip },
                { $limit: limit }  
                     
            )
            
            const empData = await Employee.aggregate([aggregateQuery]);
            res.send({empData, totalPage, LoginUser});   
        } 
        
    } catch (err) {
        res.send('Error' + err)
    }
})

// =========== For Get Country Name =============
router.get('/getCountry', async (req, res) => {
    try{
        const getCountry = await Country.find()
        res.send(getCountry)
    } catch(err) {
        res.send(err)
    }
})

// ============ For Get State Name ==================
router.get('/getState/:countryId', async (req, res) => {
    try {
        const id = req.params.countryId

        aggregateQuery =[{
            $match: {"countryId" :id}
        }]

        const userData = await State.aggregate(aggregateQuery)
        res.send(userData)
    } catch (err) {
        res.send('Error' + err)
    }
})

// ============= For Get Cities Name ==================
router.get('/getCity/:stateId', async (req, res) => {
    try {
        const id = req.params.stateId

        aggregateQuery =[{
            $match: {"stateId" : id }
        }]

        const userData = await City.aggregate(aggregateQuery)
        res.send(userData)
    } catch (err) {
        res.send('Error' + err)
    }
})

// ============ Register User =========== 
router.post('/signUp', async (req, res) => {

    const newUser = req.body

    try {

        const emailExist = await Employee.findOne({ email: newUser.email })
        const PhoneExist = await Employee.findOne({ email: newUser.phone })

        if (emailExist || PhoneExist) {
            res.send("This is already Exists")
        } else {
            const result = await Employee(newUser).save();
            res.send("Register Sucessfully")
        }
    }
    catch (err) {
        res.send("error" + err)
    };
})

// ======== for Login User ==========
router.post('/signIn', async (req, res) => {
    try {
        let token;        
        const { email, password } = req.body;

        // ============= find ExistUser
        const userLogin = await Employee.findOne({ email: email, password: password });

        if (userLogin) {
            //Generate Token
            token = await userLogin.generateAuthToken();

            //Store the Token in Cookie
            res.cookie("jwtLogin", token, {
                expiresIn: new Date (Date.now() + 1 * 3600 * 1000)
            })
            res.send({msg: "Login Successfully"});
        } else {
            res.status(400).send({ error: "Invalid User"});
        }

    } catch (err) {
        console.log(err);
    }
})

// ========= for edit User =========
router.get('/editUser/:id', authenticate, async (req, res) => {
    try {
        const editUserData = await Employee.findById(req.params.id)
        res.send(editUserData)
    } catch (err) {
        res.send('Error' + err)
    }
})

// =========== for update User ==========
router.put('/updateUser/:id/:email', authenticate,  async (req, res) => {
    try {
        const id = req.params.id;
        const updateUser = req.body;
        const email = req.params.email
        const options = { new: true }

        if (updateUser.email !== email) {
            const emailExist = await Employee.findOne({ email: updateUser.email });

            if (emailExist) {
                return res.status(400).send({error:"Email already in use"})
            } else {
                await Employee.findByIdAndUpdate(id, updateUser, options);
                res.send('Updated Successfully!')
            }
        } else {
            await Employee.findByIdAndUpdate(id, updateUser, options);
                res.send('Updated Successfully!')
        } 
    } catch (err) {
        res.send('Error' + err)
    }
})

// =========== for Delete User ==========
router.delete('/deleteUser', authenticate, async (req, res) => { 
    
    try {
        if (req.authenticateUser.email === req.query.email) {
            res.clearCookie('jwtLogin');

            const loginStatus = false

            await Employee.findOneAndDelete({ email: req.query.email })
            res.send(loginStatus)
        } else {
            const loginStatus = true

            await Employee.findOneAndDelete({email: req.query.email});
            res.send(loginStatus)
        }        
        
    } catch (err) {
        res.send('Error' + err)
    }
})

// ========== logout ============
router.get('/logout', authenticate, async (req, res) => {
    try {

        // ============ Remove token from database ===========
        req.authenticateUser.Token = req.authenticateUser.Token.filter((elem) => {
            return elem.token !== req.token
        })

        // ============= clear cookie ===================
        res.clearCookie('jwtLogin');
        await req.authenticateUser.save();
        res.send("user Logout");
    }
    catch (err) {
        console.log('error');
        res.send(err);
    }
})

module.exports = router  