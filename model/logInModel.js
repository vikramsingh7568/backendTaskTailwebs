const mongoose = require('mongoose');
const logInSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true
   },
   lastName :{
       type : String,
       required : true
   },
   password:{
     type : String ,
     required : true
   }

}, { timestamps: true });

module.exports = mongoose.model('logInstudent', logInSchema)