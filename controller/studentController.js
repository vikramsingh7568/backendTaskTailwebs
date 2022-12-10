const studentModel = require("../model/studentModel")
const {
    isValidName,
    isValidBody,
    isValidMarks,
} = require("../validation/validation.js")

const studentRegister = async function (req, res) {
    try {
        let data = req.body
        if (isValidBody(data)) {
            return res
              .status(400)
              .send({ status: false, message: "please provide request body" });
          }
      
          let { firstName, lastName, subject, marks} = data
          console.log(data)
         let allKeys = ["firstName","lastName","subject","marks"]
         let keUser = Object.keys(data)
         for(let i =0; i<allKeys.length; i++){
            if(allKeys[i] != keUser[i]) return res.status(400).send({status: false , message : "all fields mandatory , firstName,lastName ,subject,marks"})
         }
    

        
        
        if (!isValidName(firstName)) {
            return res.status(500).send({ status: false, message: "please enter valid first name " })
        }

        if (!isValidName(lastName)) {
            return res.status(500).send({ status: false, message: "please enter valid last name " })
        }

        if (!isValidName(subject)) {
            return res.status(500).send({ status: false, message: "please enter valid subject" })
        }

        
        if (!isValidMarks(marks)) {
            return res.status(500).send({ status: false, message: "please enter valid marks 0 to 100 " })
        }
     

      let CheckMarksUpdate  = await studentModel.findOne({adminId : req.decode.adminId, firstName : firstName, lastName : lastName , subject :subject,isDeleted : false})
         
      if(CheckMarksUpdate){
         let MarksId = CheckMarksUpdate._id
          let marksOut = CheckMarksUpdate.marks
          let add = marksOut+marks
          CheckMarksUpdate.marks = add
          let updateMarks = await studentModel.findOneAndUpdate({_id : MarksId}, CheckMarksUpdate, { new: true })
          return res.status(200).send({status : true , message : "successfully " , data : updateMarks})
      }
      
        data.adminId = req.decode.adminId
        console.log(data)
        let created = await studentModel.create(data)
      
        res.status(200).send({ status: true, message: "successfully created" , data : created})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}



//filter student by name or subject
const filterStudent = async function(req,res){
    try{  
          let data = req.query 
          let {name , subject} = data
          let adminId = req.decode.adminId
          
          let dataSend = await studentModel.find({ adminId :  adminId , firstName : name , subject : subject , isDeleted: false})
    
          if(dataSend.length == 0) return res.send({status : false , message : "no student found "})
         return res.status(200).send({status : true , message : "list is here " ,  data : dataSend})
    }catch(error){
        return res.status(500).send({status : false , message : error.message})
    }
}

// delete student 
const deleteStudent = async function(req,res){
    try{
         let data = req.body
         let {firstName,lastName,subject} = data
         let adminId = req.decode.adminId
     
         let studentData = await studentModel.findOne({adminId : adminId, firstName: firstName, lastName:lastName,subject:subject, isDeleted:false})
        // console.log(studentData)
          if(!studentData) return res.status(409).send({status : false, message : "no such student found"})
         
          studentData.isDeleted = true
        
         let update = await studentModel.findOneAndUpdate({_id : studentData._id}, studentData,{new : true})
         return res.status(200).send({status : true, message : "student deleted successfully"})
    }catch(error){
        return res.status(500).send({status : true , message: error.message})
    }
}



module.exports = { studentRegister ,filterStudent,deleteStudent};