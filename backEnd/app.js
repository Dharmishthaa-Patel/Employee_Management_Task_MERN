const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const url = 'mongodb://localhost/register'
const cookieParser = require("cookie-parser")

const app = express()

// config file 
dotenv.config({path: './config.env'})

//Connect to database
mongoose.connect(url)
const con = mongoose.connection

//Connection Open
con.on('open', () => {
    console.log("connected...")
})

//middleware
app.use(express.json())
// pass the cookie 
app.use(cookieParser());


// Import Router 
const regRouter = require('./Routers/signRouter')
// Route Middleware
app.use('/', regRouter)


// server listening
app.listen (5000, () => {
    console.log("server is Listening....")
})