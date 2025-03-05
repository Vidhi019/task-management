const express = require('express');
const { getTask, createTask, getAllTask, updateTask, deleteTask, findUserTask, getAllUserTask } = require('../controller/task');
const { AuthUserValidation } = require('../middleware/user');
const taskRouter = express.Router();

taskRouter.get("/tasks",AuthUserValidation , getAllTask);
taskRouter.get("/getUserTasks",AuthUserValidation , getAllUserTask);
taskRouter.get("/tasks/:id",AuthUserValidation , getTask);    
// taskRouter.get("/userTask",AuthUserValidation,findUserTask)
taskRouter.post("/" ,AuthUserValidation, createTask);
taskRouter.put("/update/:id" ,AuthUserValidation, updateTask);
taskRouter.delete("/:id" , AuthUserValidation,deleteTask);


module.exports = taskRouter;    

