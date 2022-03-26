const router = require('express').Router()
const cors = require('cors');
const User = require('../controllers/user.controller')

router.post('/signup', cors(), async(req, res) => {
    const {email, password} = req.body
    let user = await User.registerUser({email, password})
    return user ? 
       res.status(201).json({
           email: user.email,
           createdAt: user.createdAt
        }) : 
       res.status(400).json({
           message: "Error signing up"
       });
})

router.post('/login', cors(), async(req, res) => {
    const {email, password} = req.body
    let user =  await User.loginUser({email, password})
    return user ? res.json({
        token: user,
        message: "Logged in successfully"
    }) :
       res.status(400).json({
           token: user,
           message: "Invalid username/password"
       })
});

module.exports = router;
