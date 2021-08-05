// Middleware : sert à intercepter la requête : Pour auth : on va regarder si on a un token et s'il est valide on autorise la requête suivante, sinon on envoie une erreur
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    // On récupère le token
    const token = req.header('x-auth-token');

    // Si on a pas de token, on envoie une erreur.
    if (!token) {
        return res.status(401).json({ msg: 'Requête interdite' });
    }

    try {
        // On décode le token pour récupérer l'utilisateur
        const decoded = jwt.verify(token, process.env.APP_SECRET);

        // On ajoute l'utilisateur à la requête
        req.user = decoded.user;

        // On laisse la requête originale continué
        next();
    } catch (e) {
        return res.status(401).json({ msg: 'Requête interdite' });
    }
};
