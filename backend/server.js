const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var applicantRouter = require("./routes/Applicants");
var recruiterRouter = require("./routes/Recruiters");
var Token = require('./models/token');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/Users", UserRouter);
app.use("/Applicants", applicantRouter);
app.use("/Recruiters", recruiterRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
