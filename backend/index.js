// Import required modules and files
const express = require("express");
const connectToMongo = require("./db");
const Auth = require("./routes/auth");
const Note = require("./routes/note");
const Student = require("./routes/students");
const cors = require("cors");
const serverless = require('serverless-http');

// Database Connection
connectToMongo();

// Create an Express application
const app = express();

// Set the port number from the environment variable or use 3000 as the default
const port = process.env.PORT || 4000;

// Middleware to parse JSON data from the request body
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) for the app
app.use(cors());

// Define routes for authentication and notes
app.use("/", Auth); // All routes from Auth will be prefixed with '/'
app.use("/", Note); // All routes from Note will be prefixed with '/'
app.use("/", Student); // All routes from Note will be prefixed with '/'

// Start the server and listen on the specified port
// app.listen(port, () => {
//   console.log(`Server is running on port http://localhost:${port}`);
// });
module.exports.handler = serverless(app);