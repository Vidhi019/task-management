const Task = require('../model/task');

exports.getAllTaskService = async (userId) => {
    return await Task.find({ creator: userId }).populate('assignedTo creator').lean();
    

}
exports.getAllUserTaskService = async (userId) => {
    return await Task.find({ assignedTo: userId }).populate('assignedTo creator').lean();
   

}

exports.getTaskService = async (id) => {
    return await Task.findById(id).populate('assignedTo creator').lean();

}

// exports.findUserTaskService = async (userId) => {
//     return await Task.find({ "assignedTo": userId }).populate("creator assignedTo").lean(); 
// }

exports.createTaskService = async (task) => {
    return await Task.create(task);
}

exports.updateTaskService = async (id, task) => {
    return await Task.findByIdAndUpdate
    (id, task
        , { new: true });
}

exports.deleteTaskService = async (id) => {
    return await Task.findByIdAndDelete(id);
}

 