const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    // Récuperer l'utilisateur dans la base de données grâce à son email.
    // Mongoose
    try {
        const user = await User.findOne({ email });

        // Si email existe pas: utilisateur n'existe
        if (!user) {
            // Gérer erreur
            throw new Error('Le login a raté');
        }

        // Vérifier que le mot de passe qu'on a reçu dans req.body.password soit compatible avec le mot de passe de passe chiffré de la base de données
        // bcryptjs
        if (await bcrypt.compare(password, user.password)) {
            return res
                .status(200)
                .json({ msg: 'Vous êtes maintenant connecté ! 🎆', user });
        }

        throw new Error('Le login a raté');
    } catch (error) {
        res.status(500).json({ err: error.message });
    }
});

module.exports = router;
