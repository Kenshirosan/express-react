const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');
const isAuthor = require('../../../middleware/isAuthor');
const Article = require('../../../models/Article');

/**
 * @params Request: req, Response: res
 * @route POST /api/articles/create
 * @returns JSON
 */
router.post(
    '/',
    [
        auth,
        isAuthor,
        [
            check('title', 'Le titre est obligatoire').not().isEmpty().escape(),
            check('body', 'Le contenu est obligatoire')
                .not()
                .isEmpty()
                .isLength({ min: 50 }),
            check('metaDescription', 'La metaDescription est obligatoire')
                .not()
                .isEmpty()
                .escape(),
            check('category', 'La catégories est obligatoire').not().isEmpty().escape(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }

        try {
            //
            const { title, body, metaDescription, category } = req.body;

            if (!category || category === 'Open this select menu') {
                res.status(500).json({ err: 'Vous devez sélectionner une catégorie' });
            }

            const art = new Article();
            art.title = title;
            art.body = body;
            art.metaDescription = metaDescription;
            art.userId = req.user.id;
            art.categoryId = category;

            await art.save();
            //
            res.status(201).json({ msg: 'Article créé ! 🎆' });
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
