const express = require('express');
const router = express.Router();
const Article = require('../../../models/Article');

/**
 * @params Request: req, Response: res
 * @route GET /api/articles/
 * @returns JSON
 */
router.get('/', async (req, res) => {
    try {
        // GET ALL ARTICLES
        const articles = await Article.find().populate('userId', 'name'); // Comment omettre le mot de passe avec cette requête.
        //
        res.status(200).json({ articles });
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
