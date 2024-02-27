const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors')
dotenv.config();

const userRouter = require('../backend/routes/userRoute')
app.use (express.json())
app.use(cors());

// db connection
mongoose.connect(process.env.URI).then(()=>{
    console.log('db Connected')
    app.listen(process.env.PORT || 8000 , (err)=>{
        if(err){
            console.log(err)
        }
        console.log("connected")
    })
}).catch((error)=>{
    console.log(error,"error")
})

// routes 

app.use(userRouter)




