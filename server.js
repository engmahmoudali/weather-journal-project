// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8070;
const server = app.listen(port , listening);

function listening () {
    console.log(`Server Running On Port ${port}`);
}



// Add Data With Post Request
app.post('/addData' , addData);

function addData(req , res) {
    projectData['date'] = req.body.date;
    projectData['temp'] = req.body.temp;
    projectData['content'] = req.body.content;
    console.log(projectData);
    res.send(projectData);
}


// Send Data With Get Request
app.get('/all' , getData);

function getData(req,res) {
    res.send(projectData);
}