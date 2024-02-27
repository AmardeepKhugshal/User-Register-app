const express = require('express');
const router =  express.Router()
const user = require ('../models/userModel');

// create user (routes)=> (post request)

const createUser = router.post('/',async(req,res)=>{
    try {
        let {name , email , age} = req.body
        let userAdded = await user.create({
            name : name,
            email : email,
            age : age,
        })
        res.status(201).json(userAdded)
    } catch (error) {
        console.log(error)
        res.status(400).json({error : error.message})
    }
})

// show data (get request)
const showData = router.get('/',async(req,res)=>{
    try {
        const userData =  await user.find()
        res.status(200).json(userData)

    } catch (error) {
        console.log(error);
        res.status(400).json({error : error.message})
    }
})

// get single data 
const singleUserData = router.get('/:id',async(req,res)=>{
    let {id} = req.params;
    try {
         let singleUser = await user.findById({_id : id});
         res.status(201).json(singleUser)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// update user => (put/patch)

const updateUser = router.patch('/:id',async(req,res)=>{
    let {id} = req.params;
    let {name , email , age} = req.body;
    try {
        let updateUserData = await user.findByIdAndUpdate(id , req.body , {new : true}) 
        res.status(200).json(updateUserData)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

// delete the user 
const deleteUser = router.delete('/:id',async(req,res)=>{
    let { id } = req.params;
    try {
        let deleteUserdata = await user.findByIdAndDelete({_id : id});
        res.status(201).json(deleteUserdata)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



module.exports = createUser
module.exports = showData
module.exports = singleUserData
module.exports = deleteUser
