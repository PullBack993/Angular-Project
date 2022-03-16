const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO change password,password forgotten(req->email?)

async function register(usename, email, password) {

    const existing = getUserByEmail(email);
    if (existing) throw new Error('Email already exist!');

    const hashedPassword = await hash(password, 10);
    const user = new User({usename, email, hashedPassword });
    await user.save();

    if (!user) {
        return res.status(400).send('User cannot be created!')
    }

    res.send(user);
};

async function login(email, password) {
    const user = getUserByEmail(email);
    if (!user) {
        return res.status(400).send('User don\'t exist!');
    }
        
    const hasMatch = await compare(password, user.hashedPassword);

    if (!user || !hasMatch) {
        return res.status(400).send('Incorect username or password');
    }

    res.send(user);
};

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user
};

module.exports = {
    register,
    login,
};