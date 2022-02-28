const { authService } = require('../service/authService');

const signup = async (req, res, next) => {
  try {
    // console.trace(req.body)
    const user = await authService.signup(req.body);
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const requestPasswordReset = async (req, res, next) => {
  console.log('request password reset');
  const link = await authService.requestPasswordReset(req.body.email);
  res.status(200).json({
    status: 'success',
    data: link,
  });
};

const resetPassword = async (req, res, next) => {
  const { resetToken, userId } = req.query;
  const { password } = req.body;
  try {
    const isReset = await authService.passwordReset(resetToken, userId, password);
    console.log(isReset)
    if (isReset) {
      res.status(201).json({ status: 'success', message: 'password reset successful' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, requestPasswordReset, resetPassword };
