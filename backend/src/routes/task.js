const express = require('express');
const router = express.Router();

const protect = require('../middleware/AuthMiddleware');
const TaskController = require('../controllers/TaskControllers')

router.post('/',protect,TaskController.createTask)

router.get('/',protect,TaskController.getTask)

router.put('/:id', protect, TaskController.updateTask)

router.delete('/:id', protect, TaskController.deleteTask )

module.exports = router;
