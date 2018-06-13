var mongoose = require("mongoose");

// SAVE A REFERNCE TO THE SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;

// USING THE SCHEMA CONSTRUCTOR, CREATE A NEW NOTESCHEMA OBJECT
// THIS IS SIMILAR TO A SEQUELIZE MODEL
var NoteSchema = new Schema ({
    
    title: {
        type: String
    },

    body: {
        type: String
    }

});

// CREATES OUR MODEL FROM THE ABOVE SCHEMA, USING MONGOOSE'S MODEL METHOD
var Note = mongoose.model("Note", NoteSchema);

// EXPORT THE ARTICLE MODEL 
module.exports = Note;