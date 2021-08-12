// Middleware : sert à intercepter la requête : Pour isAuthor : on va regarder le role de l'utilisateur

const User = require('../models/User');

module.exports = async function (req, res, next) {
    try {
        const user = await User.findOne({ _id: req.user.id }).populate('role', 'name');

        if (user.role.name === 'user') {
            res.status(403).json({ err: 'Requête interdite' });
        }

        // On laisse la requête originale continuée
        next();
    } catch (e) {
        return res.status(403).json({ err: 'Requête interdite' });
    }
};
