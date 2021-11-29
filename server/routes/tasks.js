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
//Get one task
router.get('/:id', (req,res) =>{
    res.send(req.params.id);
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
router.patch('/:id', (req,res) =>{

});

//deleting one task
router.delete('/:id', (req,res) =>{

});

module.exports = router;