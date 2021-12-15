const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
router.post('/signup', async (req,res) =>{
    const user = new User({
        username: req.body.username,
        mail: req.body.mail,
        password: Bcrypt.hashSync(req.body.password, 10)
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username }).exec();
        if(!user) {
            return res.status(400).send({ message: "The username does not exist" });
        }
        if(!Bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(400).send({ message: "The password is invalid" });
        }
        const accessToken = await jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).json({
            accessToken,
            user
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

//for dev purpose
router.delete("/deleteAll", async (req, res) =>{
    try{
        await User.remove({}, res.status(200).json('Thanos snapped twice') );
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;