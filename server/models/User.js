const { Schema, model } = require('mongoose');

//TODO Comments schema 
const userSchema = new Schema({
    usernam:{ type: String, required: true},
    email: { type: String, required: true},
    hashedPassword: { type: String, required: true },
    likedAd: [{ type: Schema.Types.ObjectId, ref: 'Ad' }]
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

const User = model('User', userSchema);

module.exports = User;

