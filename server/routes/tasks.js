const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const jwt = require("jsonwebtoken");

//Get all tasks
router.get('/', authenticateToken, async (req,res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
});

// Get one task
router.get('/:id', getTask,(req,res) =>{
    res.json(res.task);
});

//Creating one task
router.post('/', authenticateToken, async (req,res) =>{
    const task = new Task({
        text: req.body.text,
        day: req.body.day,
        reminder: req.body.reminder
    });
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    }catch(err){
        res.status(400).json({message: err.message});
    }
});

//Updating one task
router.patch('/:id', getTask, async (req,res) =>{
    if(req.body.text != null){
        res.task.text = req.body.text;
    }
    if(req.body.day != null){
        res.task.day = req.body.day;
    }
    if(req.body.reminder != null){
        res.task.reminder = req.body.reminder;
    }
    try{
        const updatedTask = await res.task.save();
        res.json(updatedTask);
    }catch(err){
        res.status(400).json({message: err.message});
    }

});

//deleting one task
router.delete('/:id', getTask, async (req,res) =>{
    try{
        await res.task.remove();
        res.json({message: "Deleted task"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    })
}

async function getTask(req, res, next){
    let task;
    try{
        task = await Task.findById(req.params.id);
        if(task == null){
            return res.send(400).json({message: "Cannot find task"});
        }
    }catch(err){
        return res.send(500).json({message: err.message});
    }
    res.task = task;
    next();
}

module.exports = router;