const bcrypt = require('bcrypt')
const userModel = require('../model/user');
const tokenModel = require('../model/token');

const authService  = {
  signup: async ({name, email, password}) => {
    try {
      let user = await userModel.findOne({ email});
      if (user) throw new Error('email already exists');
      user = new userModel({name, email, password})
      return await user.save(); 
    } catch (error) {
      throw new Error(error)
    }
  }, 
  requestPasswordReset: async (email) => {
    try {
      const user = await userModel.findOne({ email });
      if (!user) throw new Error('user does not exist');
      const token = await tokenModel.findOne({ userId: user._id });
      if (token) await tokenModel.deleteOne({ _id: token._id });
      
      // gen a reset token
      const resetToken = crypto.randomBytes(32).toString('hex'); 
      console.log(resetToken); 
      const hash = await bcrypt.hash(resetToken, parseInt(process.env.BCRYPT_SALT));
      
      await new tokenModel({
          userId:user._id, 
          token: hash, 
          createdAt: Date.now()
      }).save(); 
  
      const link = `${process.env.CLIENT_URI}/resetPassword?resetToken=${resetToken}&userId=${user._id}`
      return link; 
    } catch (error) {
      throw new Error(error);
    }
  }, 
  passwordReset: async(resetToken, userId, password) => {
    try {
        const passwordResetToken = await tokenModel.findOne({userId}); 
        if(!passwordResetToken) throw new Error('invalid or expired password reset token')
        const isValid = await bcrypt.compare(resetToken, passwordResetToken); 
        if(!isValid) throw new Error('invalid or expired password reset token')

        // hash password
        const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT)
        const updatedUser = await userModel.updateOne({_id: user._id}, {$set: {password: hash}}, {new: true})

        // send email 
        await passwordResetToken.deleteOne();
    } catch (error) {
      throw new Error(error)
    }
  }
}


module.exports = {authService}; 