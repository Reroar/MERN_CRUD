const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(mongoURI);
        if(connect){
            console.log("Database connected");
        }
    } catch (error) {
        console.log("Database connection error",error); 
    }
}

module.exports = connectDB;