const User = require('../models/User');
const { hash, compare } = require('bcrypt');

//TODO change password,password forgotten(req->email?)

async function register(username,email, password) {

    const existing = await getUserByEmail(email);
    if (existing) throw new Error('Email already exist!');

    const hashedPassword = await hash(password, 10);
    const user = new User({username, email, hashedPassword });
    await user.save();

    if (!user) {
        throw new Error('User cannot be created!')
    }

    return user
};

async function login(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User don\'t exist!');
    }
        
    const hasMatch = await compare(password, user.hashedPassword);

    if (!user || !hasMatch) {
        throw new Error('Incorect username or password');
    }

    return user
};

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user
};

module.exports = {
    register,
    login,
};