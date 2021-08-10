const express = require('express');
const router = express.Router();
const Category = require('../../../models/Category');

/**
 * @params Request: req, Response: res
 * @route GET /api/categories/
 * @returns JSON
 */
router.get('/', async (req, res) => {
    try {
        // GET ALL CATEGORIES
        const categories = await Category.find();
        //
        res.status(200).json({ categories });
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
