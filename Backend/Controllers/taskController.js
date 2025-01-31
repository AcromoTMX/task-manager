const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        console.log("Authenticated user ID:", req.user?._id); 

        const { title, description, dueDate, priority } = req.body;

    
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }

       
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }

        
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            userId: req.user._id,
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { $set: req.body },
            { new: true }
        );
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!deletedTask) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};
