const signupModel = require("../model/signupModel")
const {
    isValid,
    isValidName,
    isValidPhone,
    isValidEmail,
    isValidPwd,
    isValidPincode,
    isValidId,
    isValidBody,
    isValidMarks,
} = require("../validation/validation.js")



const signupUser = async function (req, res) {
    try {
        let data = req.body
        let { firstName, lastName, subject, marks, mobile, password } = data
        console.log(data)
         let allKeys = ["firstName","lastName","subject","marks","mobile","password"]
         let keUser = Object.keys(data)
         for(let i =0; i<allKeys.length; i++){
            if(allKeys[i] != keUser[i]) return res.status(400).send({status: false , message : "all fields mandatory , firstName,lastName ,subject,marks,mobile,password"})
         }
    

        if (isValidBody(data)) {
            return res
              .status(400)
              .send({ status: false, message: "please provide request body" });
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
     
        if (!isValidPhone(mobile)) {
            return res.status(500).send({ status: false, message: "please enter valid mobile no   " })
        }

        if (!isValidPwd(password))
                return res.status(400).send({status: false,message:
          "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters",
      });

      let CheckMarksUpdate  = await signupModel.findOne({firstName : firstName, lastName : lastName , subject :subject, mobile : mobile, password : password})
         
      if(CheckMarksUpdate){
         let MarksId = CheckMarksUpdate._id
          let marksOut = CheckMarksUpdate.marks
          let add = marksOut+marks
          CheckMarksUpdate.marks = add
          let updateMarks = await signupModel.findOneAndUpdate({_id : MarksId}, CheckMarksUpdate, { new: true })
          return res.status(200).send({status : true , message : "successfully " , data : updateMarks})
      }

        let CheckMobile  = await signupModel.findOne({mobile : mobile})
      
        if(CheckMobile) return res.status(409).send({status : false , message : "this number is already registered"}) 
      
        let createSignup = await signupModel.create(data)
      
        res.status(200).send({ status: true, message: "successfully signup" , data : createSignup})

    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// const userGet = async function(req,res){
//     try{

//     }catch(error){
//         res.status(500).send({status: false,message: error.message})
//     }
// }

module.exports = { signupUser };