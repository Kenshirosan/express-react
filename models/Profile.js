const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    bio: {
        type: String,
        required: true,
    },
    favorites: [
        {
            articleId: {
                type: mongoose.Types.ObjectId,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
        },
    ],
    lastPublished: {
        type: String,
        required: 'Construire un requête avec le modèle article',
    },
    socialLinks: {
        youtube: {
            type: String,
        },
        dribble: {
            type: String,
        },
        twitch: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        facebook: {
            type: String,
        },
        snapchat: {
            type: String,
        },
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

module.exports = Profile = mongoose.model('profile', ProfileSchema);
