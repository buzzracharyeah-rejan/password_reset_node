const router = require('express').Router(); 
const authController = require('../controller/auth')
const {validateBody, validateQuery} = require('../middlewares/validator'); 
const {signupSchema, emailSchema, passwordSchema, querySchema} = require('../middlewares/validationSchema/authSchema')

router.post('/signup', validateBody(signupSchema),  authController.signup); 
router.post('/forgotPassword', validateBody(emailSchema), authController.requestPasswordReset); 
router.post('/resetPassword', validateQuery(querySchema), validateBody(passwordSchema), authController.resetPassword); 

module.exports = router; 