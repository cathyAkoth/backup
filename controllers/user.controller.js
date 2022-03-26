const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env


const registerUser = async (data) => {
    let pwdString = data.password;
    if (pwdString) {
        data.password = await bcrypt.hash(pwdString, 10) 
    }
    return await User.create(data);
};

const loginUser = async (data) => {
    let  pwdString = data.password;
    let user = await User.findOne({email: data.email});
    let loggedIn = await bcrypt.compare(pwdString, user.password)
    let token;
    
    if(loggedIn) {
        token  = await jwt.sign({email:user.email}, SECRET_KEY)
    } else {
        token = null
    }
    return token;
    
}

module.exports = {
    registerUser,
    loginUser
}
