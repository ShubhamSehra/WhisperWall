const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/postsecret', async(req, res) => {
    const {id, secret} = req.body
    
    try {
        await User.findByIdAndUpdate(id,
            {$push: {secrets: secret}}
        )
        res.send('secret posted sucessfully')
      
    } catch (error) {
        console.log(error);
        
    }
    
    
})

router.post('/deleteSecret', async(req, res) =>{
    const {id, secret} = req.body;
    try {
        await User.findByIdAndUpdate(id,{
            $pull: {secrets: secret}
        })
        res.send("secret deleted successfully")
    } catch (error) {
        console.log(error);
                
    }
})


module.exports = router;