const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');

/**
 * @params Request: req, Response: res
 * @route POST /api/users/register
 * @returns JSON
 */
router.post('/', async (req, res) => {
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

        res.status(201).json({ msg: 'Votre compte a été créé ! 🎆' });
    } catch (error) {
        let messages = [];

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
