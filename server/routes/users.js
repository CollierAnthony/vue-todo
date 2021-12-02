const express = require('express');
const router = express.Router();
const User = require('../models/user');


//Get all users
router.get('/', async (req,res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

//Creating one user
router.post('/', async (req,res) =>{
    const user = new User({
        username: "Anthony",
        mail: "anthony@yopmail.com",
        password: "azerty"
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

module.exports = router;