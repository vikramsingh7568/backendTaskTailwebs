//const { model } = require("mongoose")
const adminModel = require("../model/adminModel")
const studentModel = require("../model/studentModel")
const jwt = require('jsonwebtoken')
const  {
     isValidEmail,
     isValidPwd,
     isValidBody,
     isValidName} = require("../validation/validation.js")


const adminRegister = async function(req,res){
    try{
          let data = req.body
           console.log(data)
           let {firstName : firstName, lastName : lastName,email :email, password :password } = data
           if (isValidBody(data)) {
            return res
              .status(400)
              .send({ status: false, message: "please provide request body" });
          }
        
        if(!firstName) return res.status(400).send({status : false , message : "first name is mandatory"})
        if(!lastName) return res.status(400).send({status : false , message :  "last name is mandatory"})  
        if(!email) return res.status(400).send({status : false , message :     "email is mandatory"})
        if(!password) return res.status(400).send({status : false , message :  "password is mandatory"})
      


        if (!isValidName(firstName)) {
            return res.status(500).send({ status: false, message: "please enter valid first name " })
        }

        if (!isValidName(lastName)) {
            return res.status(500).send({ status: false, message: "please enter valid last name " })
        }
 
         if (!isValidEmail(email)) {
                return res.status(400).send({
             status: false, message: "EmailId is not valid "
            })
        }

          if (!isValidPwd(password))
                return res.status(400).send({status: false,message:
                  "Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters",
         });
         
         
         
           let CheckUser = await adminModel.findOne({email :email , password:password })
    
     if(CheckUser){
        return res.status(200).send({status : false , message : "you are already registered please go to log in page "})
     }
      

     let CreatLogIn = await adminModel.create(data)
      return res.status(201).send({status : true , message : "admin created successfully" , data : CreatLogIn})
    }catch(error){
        res.status(500).send({status : fasle , message : error.message})
    }
} 


// ----------------------------------//////////////////////////=------------------------------------
// login admin function 
const logInAdmin = async function(req,res){
    try{
           let data = req.body
          // console.log(data)
           let {email,password} = data

   if (isValidBody(req.body)) {
    return res.status(400).send({ status: false, msg: "please input email and password" })
}

// email is mandatory 
if (!email) { return res.status(400).send({status: false, message: "EmailId is mandatory" })}

// Password is mandatory
if (!password) {return res.status(400).send({status: false, message: "Password is mandatory"})}


if (!isValidEmail(email)) {
    return res.status(400).send({
        status: false, message: "Please Provide valid email id "
    })
}


if (!isValidPwd(password))
return res.status(400).send({status: false,message:
"Password should be 8-15 characters long and must contain one of 0-9,A-Z,a-z and special characters",
});

     

let CheckUser = await adminModel.findOne({email :email, password : password})
   
     if(CheckUser){
        req.adminId = CheckUser._id
     //   console.log(req)
        let token = jwt.sign(
            {
                adminId: CheckUser._id.toString(),
                batch: "Plutonium",
                organisation: "tailwebBackendTaskProject, Plutonium-Batch"
            },
            "Admin-student-login-panel", {

            expiresIn: '10h' // expires in 1m minits

        });
        return res.status(201).send({ status: true,message: "logIn successfully", message: token })
    } 
        else{
        return res.status(400).send({status : false , message :" please register before login in "})
     }

    }catch(error){
        res.status(500).send({status : false , message : error.message})
    }
} 


module.exports = {adminRegister,logInAdmin}