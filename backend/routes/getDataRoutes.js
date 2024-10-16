const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/userdata', async(req,res)=>{
    try {
        const users = await User.find({});
        res.json(users)
        
        
    } catch (error) {
      console.log(error, "hello");
        
    }
})
router.get('/getDetails', async(req,res)=>{
    const {userId} = req.query; 
    try {
        const users = await User.findById(userId);
        res.json(users)
       
        
    } catch (error) {
      console.log(error, "hello");
        
    }
})

module.exports = router;