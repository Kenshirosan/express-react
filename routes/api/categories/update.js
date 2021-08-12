const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const Category = require('../../../models/Category');

/**
 * @params Request: req, Response: res
 * @route POST /api/categories/update
 * @returns JSON
 */
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Le nom de la catégorie est obligatoire')
                .not()
                .isEmpty()
                .escape(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }

        try {
            //
            const { id, name } = req.body;

            // UPDATE ONE CATEGORY
            const cat = await Category.findOne({ _id: id });
            cat.name = name;

            await cat.save();

            //
            res.status(201).json({ msg: 'Catégorie mise à jour ! 🎆' });
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
