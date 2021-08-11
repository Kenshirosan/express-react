const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const Category = require('../../../models/Category');

/**
 * @params Request: req, Response: res
 * @route POST /api/categories/destroy
 * @returns JSON
 */
router.post('/', auth, async (req, res) => {
    try {
        //
        const { id } = req.body;

        await Category.findOneAndRemove({ _id: id });
        // DELETE ONE CATEGORY
        //
        res.status(201).json({ msg: 'Catégorie effacée ! 🎆' });
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