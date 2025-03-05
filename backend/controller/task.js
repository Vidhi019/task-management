const Task = require('../model/task');
const { getAllTaskService, getTaskService, createTaskService, deleteTaskService, updateTaskService, findUserTaskService, getAllUserTaskService } = require('../service/task');

exports.getAllTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await getAllTaskService(userId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
exports.getAllUserTask = async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await getAllUserTaskService(userId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await getTaskService(taskId);
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

    // exports.findUserTask = async (req, res) => {
    //     try {
            
    //         const userId = req.user.id;
    //         const task = await findUserTaskService(userId)

    //         if(!task ){
    //             return res.status(404).json({ message: "Task not found" })
    //         }

    //         return res.status(200).json({message : "Task found", task})

    //     }
    //     catch(err){
    //         return res.status(404).json({ message: err });
    //     }
    // }

exports.createTask = async (req, res) => {
    try {
        console.log("user",req.user);
        
        const task = {...req.body, creator : req.user.id , status : 'pending'};
        const createdTask = await createTaskService(task); 
        res.status(201).json(createdTask); 
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = req.body
        await updateTaskService(id, task);
        res.json(task);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

    
}

exports.deleteTask = async (req, res) => {
    try {
         const taskId = req.params.id;
        const task = await deleteTaskService(taskId);
        res.send("Task deleted successfully");
    } catch (err) {     
        res.status(500).json({ error: err.message });
    }   
}


