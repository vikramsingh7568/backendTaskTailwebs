//const { model } = require("mongoose")
const logInModel = require("../model/logInModel")
const signupModel = require("../model/signupModel")
const validaton  = require("../validation/validation.js")
const logInFunction = async function(req,res){
    try{
let data = req.body
console.log(data)
   let {firstName, lastName,password} = data

     let CheckUser = await signupModel.find({firstName : firstName, lastName : lastName, password :password })
    
     if(CheckUser){
        let CreatLogIn = await logInModel.create(data)
        return res.status(200).send({status : true , message : "log in successfull",data : CreatLogIn})
     } else{
        return res.status(400).send({status : false , message :" please signup before sign in "})
     }

    }catch(error){
        res.status(500).send({status : fasle , message : error.message})
    }
} 

module.exports = {logInFunction}