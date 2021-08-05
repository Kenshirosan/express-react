const express = require('express');
const router = express.Router();
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

        // Vérifier que le mot de passe qu'on a reçu dans req.body.password soit compatible avec le mot de passe de passe chiffré de la base de données.
        // bcryptjs
        if (await bcrypt.compare(password, user.password)) {
            // Créer un JWT
            let payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.APP_SECRET,
                { expiresIn: -1 }, // Validité du token en seconde || -1 pour validité infinie
                function (err, token) {
                    if (err) throw err;

                    res.status(200).json({
                        msg: 'Vous êtes maintenant connecté ! 🎆',
                        token,
                    });
                }
            );
        }
    } catch (error) {
        let messages = [];

        if (error.message) {
            messages.push(error.message);
        }

        // Si on a des erreurs de mongodb :
        if (error.errors) {
            for (let item in error.errors) {
                messages.push(error.errors[item]['message']);
            }
        }
        // Si on a d'autres erreurs :
        if (error.custom) {
            messages.push(error.message);
        }

        res.status(500).json({ err: messages });
    }
});

module.exports = router;
