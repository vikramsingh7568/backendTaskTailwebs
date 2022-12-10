
const express = require('express');
const router = express.Router();
const studentController = require("../controller/studentController.js")
const adminController = require("../controller/adminController.js")
const auth = require("../middleware/auth.js")
//const commonMW = require('../middleware/auth')


// post login Admin
router.post("/registerAdmin", adminController.adminRegister)
router.post("/logInAdmin",adminController.logInAdmin)


// student panel api's
// create users 
router.post("/studentRegister",auth.authentication,auth.Authorisation ,studentController.studentRegister)
router.get("/filterStudent",auth.authentication,auth.Authorisation ,studentController.filterStudent)
router.delete("/deleteStudent",auth.authentication,auth.Authorisation ,studentController.deleteStudent)




router.all("/*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})
module.exports = router