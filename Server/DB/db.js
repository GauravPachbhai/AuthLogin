const mongoose = require("mongoose");

// Database connection
const URL = process.env.MONGO_URL ||'mongodb+srv://gaurav:root@usersdb.8p9lava.mongodb.net/?retryWrites=true&w=majority&appName=UsersDB';
mongoose.connect(URL);
const connection = mongoose.connection;

connection.on('error', (error) => {
    console.error("Error while connecting db:", error);
});

connection.on('connected', () => {
    console.log("Db Connected Successfully");
});

module.exports = mongoose;
