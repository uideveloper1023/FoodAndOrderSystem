var mongoose = require('mongoose');

//defining Schema for userCollection 
var Schema = mongoose.model('miracle_collection', {
  name: String,
  email: String,
  rollno : String,
  password: String,
  phoneno: String
});

// exporting our schema
module.exports.Schema=Schema;
