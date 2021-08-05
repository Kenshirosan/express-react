const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ValidationError = mongoose.Error.ValidationError;

const UserSchema = new Schema({
    name: {
        type: String,
        required: false, // Par défaut : required est false : donc on est pas obligé de le mettre.
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
});

module.exports = User = mongoose.model('user', UserSchema);
