// nodemon app.js
const mongoose = require("mongoose");

// const MongoUrl = "mongodb+srv://amirrafay135:XyImBf1YGtzacNcK@blogcluster.drny97g.mongodb.net/";
const MongoUrl = "";

// Database Connection
const connectToMongo = async () => {
  try {
    await mongoose.connect(MongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error occurred in db connection");
  }
};

module.exports = connectToMongo;
