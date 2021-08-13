const express = require('express');
const router = express.Router();
const { param, check } = require('express-validator');
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

/**
 * @params Request: req, Response: res
 * @route GET /api/article/:id Le param s'appelle query string, Pensez impérativement à échapper ,les query string.
 * Note that the query string (name/value pairs) is sent in the URL of a GET
 * @returns JSON
 */
router.get('/:id', [param('id', 'message erreur').escape()], async (req, res) => {
    try {
        // GET ALL ARTICLES

        // Mission : échapper id, faire en sorte de convertir les caractères spéciaux.

        const { id } = req.params;

        const article = await Article.findOne({ _id: id })
            .populate('userId', 'name') // Comment omettre le mot de passe avec cette requête.
            .populate('categoryId', 'name');
        //
        res.status(200).json({ article });
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
