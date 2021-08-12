const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const Role = require('../../../models/Role');

/**
 * @params Request: req, Response: res
 * @route POST /api/roles/create
 * @returns JSON
 */
router.post(
    '/',
    [auth, [check('name', 'Le nom du rôle est obligatoire').not().isEmpty().escape()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }

        try {
            //
            const role = new Role();

            role.name = req.body.name;

            await role.save();
            //
            res.status(201).json({ msg: 'Rôle créé ! 🎆' });
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
                messages.push(error.message);
            }

            res.status(500).json({ err: messages });
        }
    }
);

module.exports = router;
