const mongoose = require('mongoose');
const signupSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   subject: {
      type: String,
      required: true
   },
   marks: {
      type: Number,
      required: true,
   },
   mobile:{
      type : String,
      required : true,
   },
   password:{
     type : String ,
     required : true
   }

}, { timestamps: true });

module.exports = mongoose.model('studentname', signupSchema)