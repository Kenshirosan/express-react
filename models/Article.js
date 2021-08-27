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
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    categoryId: {
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

// methode static pour extraire les dates de creation des articles et les afficher dans Le composant archives. (equivalent de GROUP BY en SQL)
// On s'en sert dans api/articles/index.js
ArticleSchema.statics.getDates = async function () {
    return await this.aggregate([
        { $project: { month: { $substr: ['$createdAt', 0, 7] } } },
        { $group: { _id: '$month', number: { $sum: 1 } } },
        { $sort: { _id: 1 } },
    ]);
};

module.exports = Article = mongoose.model('article', ArticleSchema);
