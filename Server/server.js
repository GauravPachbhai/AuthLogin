const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;

const dbConfig = require('./DB/db');
const userRoutes = require("./routes/user");




app.use(cors());

app.use(express.json())
// Route handling
app.use('/api/users',userRoutes);



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}--------------------------->`);
});
