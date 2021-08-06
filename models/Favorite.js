const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
    articleId: {
        type: mongoose.Types.ObjectId,
    },
    title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Favorite = mongoose.model('favorite', FavoriteSchema);
