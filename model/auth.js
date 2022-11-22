//mongoose an express module for creating tables in mongoDb
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const JWT = require('Jsonwebtoken');
const validator = require('validator')
const authSchema = mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  confirmPassword: {
    type: String,
    required: [true, 'please confirm your original password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      msg: 'password mismatch',
    },
  },
  username: {
    type: String,
  },
});
authSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.confirmPassword = undefined;
});
authSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = bcrypt.compare(userPassword, this.password);
  return isMatch;
};

authSchema.methods.createJWT = function () {
  return JWT.sign(
    { id: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};
module.exports = mongoose.model('Auth', authSchema);
