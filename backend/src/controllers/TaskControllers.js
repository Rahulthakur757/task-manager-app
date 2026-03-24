const Task = require('../models/Task');

async function createTask(req, res, next) {
    try {
        const task = await Task.create({
            ...req.body,
            createBy: req.user.id
        });

        res.status(201).json({success: true, data: task});

    } catch (error) {
        next(error);
    }
}

async function getTask(req, res, next) {
    try {
        const tasks = await Task.find({ createBy: req.user.id });

        res.status(200).json({success: true, data: tasks});

    } catch (error) {
        next(error);
    }
}

async function updateTask(req, res, next) {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createBy: req.user.id },
            req.body,
            { new: true }
        );

        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({success: true, data: task});

    } catch (error) {
        next(error);
    }
}

async function deleteTask(req, res, next) {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            createBy: req.user.id
        });

        if(!task){
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({success: true, message: "Task deleted" });

    } catch (error) {
        next(error);
    }
}
module.exports ={
    createTask,
    getTask,
    updateTask,
    deleteTask

}