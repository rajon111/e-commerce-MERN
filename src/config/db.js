const mongoose = require('mongoose');
const { mongoDbURL } = require('../secret');

const connectDB = async(options)=>{
    try {
        await mongoose.connect(mongoDbURL,options = {})
        console.log('connected to MongoDB ... [config/db.js]');
        //
        mongoose.connection.on('error', (error) => {
            console.error('DB connection error', error)
        });
    } catch (error) {
        // 
        console.error('Could not connect to DB', error.toString())
    }
}

module.exports = connectDB;