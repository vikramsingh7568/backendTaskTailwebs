
const express = require('express');
const router = express.Router();
const signupController = require("../controller/signupController.js")
const logInController = require("../controller/logInController.js")
//const commonMW = require('../middleware/auth')

// create users 
 router.post("/userregister", signupController.signupUser)

// post login user
router.post("/logInuser", logInController.logInFunction)

router.all("/*", function (req, res) {
    res.status(404).send({
        status: false,
        message: "Make Sure Your Endpoint is Correct !!!"
    })
})
module.exports = router