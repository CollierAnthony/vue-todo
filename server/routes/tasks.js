const express = require('express');
const router = express.Router();
const Task = require('../models/task');

//Get all tasks
router.get('/', async (req,res) => {
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
router.post('/', async (req,res) =>{
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
router.put('/:id', getTask, async (req,res) =>{
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