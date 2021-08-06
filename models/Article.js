const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true, // Par défaut : required est false : donc on est pas obligé de le mettre.
    },
    figure: {
        type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category',
    },
    metaDescription: {
        type: String,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Article = mongoose.model('article', ArticleSchema);
