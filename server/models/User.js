const { Schema, model } = require('mongoose');

//TODO Comments schema 
const userSchema = new Schema({
    username:{ type: String, required: true},
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    imageUrl: {type: String, default: ''},
    isBroker: { type: Boolean, default: false },
    isAdmin: {type: Boolean, default: false},
    likedAd: [{ type: Schema.Types.ObjectId, ref: 'Ad' }]
    // comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});


const User = model('User', userSchema);

module.exports = User;

