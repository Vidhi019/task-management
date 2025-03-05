const mongoose = require('mongoose');

exports.connectDB = () => {
    mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Connected to the database');
    })
    .catch((err) => {
        console.log('Failed to connect to the database', err);
    });
}