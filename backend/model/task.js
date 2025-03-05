const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String },
    status : { type: String,enum : ["pending", "progress","completed"] ,required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true},
    assignedTo : { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required: true},
    // userId :  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }

}, {timestamps: true});

module.exports = mongoose.model('Task', taskSchema);