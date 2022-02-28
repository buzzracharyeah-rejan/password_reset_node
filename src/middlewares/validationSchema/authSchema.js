const joi = require('joi');

const signupSchema = joi.object({
  username: joi.string().required().label('username').trim().min(3).max(30),
  email: joi.string().email().required().label('email').trim(), 
  password: joi.string().trim().required('password').min(8).max(100)
});


module.exports = {signupSchema}