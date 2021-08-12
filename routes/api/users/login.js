const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @method POST
 * @route /api/users/login
 */
router.post(
    '/',
    [
        check('email', "L'email n'est pas correct").isEmail(),
        check('password', 'Le mot de passe ne convient pas')
            .not()
            .isEmpty()
            .isLength({ min: 6 })
            .escape(),
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        // Récuperer l'utilisateur dans la base de données grâce à son email.
        // Mongoose

        console.log(password);

        return;
        try {
            const user = await User.findOne({ email });

            // Si email existe pas: utilisateur n'existe
            if (!user) {
                // Gérer erreur
                throw new Error('Le login a raté');
            }

            // Vérifier que le mot de passe qu'on a reçu dans req.body.password soit compatible avec le mot de passe de passe chiffré de la base de données.
            // bcryptjs

            const checked = await bcrypt.compare(password, user.password);

            if (checked) {
                // Créer un JWT
                let payload = {
                    user: {
                        id: user.id,
                    },
                };

                return jwt.sign(
                    payload,
                    process.env.APP_SECRET,
                    { expiresIn: 36000 }, // Validité du token en seconde || -1 pour validité infinie
                    function (err, token) {
                        if (err) throw err;

                        return res.status(200).json({
                            msg: 'Vous êtes maintenant connecté ! 🎆',
                            token,
                            user, // Ajout de l'user dans la réponse : temporaire
                        });
                    }
                );
            }
            throw new Error('Vérifiez votre mot de passe');
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
    }
);

module.exports = router;

// Avec .escape on convertit les caractères spéciaux en entité HTML.
// <script>alert('alerte de sécurité')</script>; // Avant conversion
// &lt;script&gt;alert(&#x27;alerte de sécurité&#x27;)&lt;&#x2F;script&gt; // Après conversion
