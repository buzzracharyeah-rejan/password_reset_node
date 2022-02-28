const router = require('express').Router(); 
const authController = require('../controller/auth')
const {validateBody} = require('../middlewares/validator'); 
const {signupSchema} = require('../middlewares/validationSchema/authSchema')

router.post('/signup', validateBody(signupSchema),  authController.signup)

module.exports = router; 