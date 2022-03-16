const { Schema, model } = require('mongoose');

//TODO *enum for adType, estateType, Location, Region

const homeSchema = new Schema({
    adType: { type: String, required: [true, 'Ad type is required'] },
    estateType: { type: String, required: [true, 'Title is required!'] },
    price: { type: Number, required: [true, 'Price is required'] },
    rooms: { type: Number, require: [true, 'Room section is required'] },
    location: { type: String, require: [true, 'Location is required'] },
    imageUrls: [{ type: String, default: '' }],
    region: { type: String, required: [true, 'Region is required'] },
    area: { type: Number, required: true },
    floor: { type: Number, required: true },
    constructionType: { type: String, required: true },
    date:{type: Number},
    telNumber: { type: Number, required: true },
    moreInfo: { type: String },
    
    likedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

homeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

homeSchema.set('toJSON', {
    virtuals: true,
});

const Home = model('Home', homeSchema);

module.exports = Home;