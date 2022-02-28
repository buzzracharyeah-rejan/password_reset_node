const joi = require('joi');

const signupSchema = joi.object({
  username: joi.string().required().label('username').trim().min(3).max(30),
  email: joi.string().email().required().label('email').trim(),
  password: joi.string().trim().required().label('password').min(8).max(100),
});

const emailSchema = joi.object({ email: joi.string().required().trim().email().label('email') });

const passwordSchema = joi.object({
  password: joi.string().trim().required().label('password').min(8).max(100),
});

const querySchema = joi.object({
  resetToken: joi.string().required().trim().label('reset token'),
  userId: joi.string().required().trim().label('password'),
});

module.exports = { signupSchema, emailSchema, passwordSchema, querySchema};
