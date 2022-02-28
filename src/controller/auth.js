const { authService } = require('../service/authService');

const signup = async (req, res, next) => {
  try {
    // console.trace(req.body)
    const user = await authService.signup(req.body);
    res.status(201).json({
      status: 'success', 
      data: user
    })
  } catch (error) {
    next(error)
  }
};

const requestPasswordReset = (req, res, next) => {};

module.exports = { signup };
