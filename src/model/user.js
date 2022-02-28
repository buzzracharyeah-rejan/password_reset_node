const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'username required'],
    },
    email: {
      type: String,
      required: [true, 'email required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password required'],
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
