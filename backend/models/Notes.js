const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true 
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Registeruser is the name of the collection in the database //
module.exports = mongoose.model("notes" , NotesSchema);