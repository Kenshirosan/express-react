const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Article = require('../../../models/Article');

/**
 * @params Request: req, Response: res
 * @route POST /api/articles/create
 * @returns JSON
 */
router.post('/', auth, async (req, res) => {
    try {
        //
        const { title, body, metaDescription, category } = req.body;
        console.log(category);
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
});

module.exports = router;
