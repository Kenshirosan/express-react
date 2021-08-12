const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

/**
 * @params Request: req, Response: res
 * @route POST /api/users/register
 * @returns JSON
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

        try {
            let { email, password } = req.body;
            // TODO: Validation

            const user = new User({
                email,
                password,
            });

            // Chiffrer un mot de passe avec bcryptjs
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Envoie de mail de confirmation de email addresse

            res.status(201).json({ msg: 'Votre compte a été créé ! 🎆' });
        } catch (error) {
            let messages = [];

            if (error.message && error.keyValue) {
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
                console.log('ok');
                messages.push(error.message);
            }

            res.status(500).json({ err: messages });
        }
    }
);

module.exports = router;
