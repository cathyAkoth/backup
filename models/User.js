const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: String,
    password: {
      type: String,
      min:5,
      maxlength:255
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
