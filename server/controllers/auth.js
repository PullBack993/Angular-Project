const { mapErrors } = require('../helpers/guards');
const { register, login } = require('../services/user');
const jwt = require('jsonwebtoken');
require('dotenv/config');

const router = require('express').Router();

router.post('/register',  async (req, res) => {
    const { username, email, password, repass } = req.body;
    
    try {
        checkInput(req.body);
        
        if (password.length < 5) throw new Error('Password cannot be less then 5 characters');
        if (password.trim() != repass.trim()) throw new Error('Password don\'t match');
    
        const user = await register(username.trim(), email.trim(), password.trim());
        
        token = createToken(user, res);
        res.status(201).send({ user: user.email, token });

    } catch (err) {
        console.log(err)
        const errors = mapErrors(err)
        res.status(400).json({ message: errors });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        checkInput({ email: email, password: password });
        const user = await login(email.trim(), password.trim());
        const token = createToken(user);

        res.status(201).send({ user:user, token });
        
    } catch (err) {
        console.log(err)
        const errors = mapErrors(err);
        res.status(400).json({ message: errors });
    };
});

function createToken(user) {
    const userViewModel = { _id: user._id, email: user.email}
    const token = jwt.sign(userViewModel, process.env.TOKEN_SECRET,{ expiresIn: '1d' });
    return token;
};

function checkInput(inputObj) {
    if (Object.values(inputObj).some(field => field == undefined || field == '') == true) {
        throw new Error( 'All fields required')
    }
};

module.exports = router;