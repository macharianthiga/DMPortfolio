//SCHEMA SETUP

var mongoose =require("mongoose");

var projectSchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String,
    stack: String,
    url: String
});

module.exports = mongoose.model("Project", projectSchema);
