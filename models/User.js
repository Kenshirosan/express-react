const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: false, // Par défaut : required est false : donc on est pas obligé de le mettre.
    },
    avatar: {
        type: String,
    },
    role: {
        type: mongoose.Types.ObjectId,
        ref: 'role',
    },
    email: {
        type: String,
        required: 'Email obligatoire',
        unique: true,
    },
    password: {
        type: String,
        required: 'Mot de passe obligatoire',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = User = mongoose.model('user', UserSchema);
