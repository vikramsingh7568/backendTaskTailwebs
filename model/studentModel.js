const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
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
   adminId: {
      type: ObjectId,
      ref: "adminname",
      required: true
  },
  isDeleted :{
     type : Boolean,
     default : false
  }

}, { timestamps: true });

module.exports = mongoose.model('studentname', signupSchema)