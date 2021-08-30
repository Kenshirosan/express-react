const fs = require('fs');
const { param } = require('express-validator');
const express = require('express');
const router = express.Router();
const commonmark = require('commonmark');
/**
 * @route /api/steps
 * @returns html
 */
router.get('/:steps', param('steps', 'An error occured').escape(), (req, res) => {
    const file = req.params.steps;

    fs.readFile(`markdown/${file}.md`, 'utf-8', function (err, data) {
        const reader = new commonmark.Parser();
        const writer = new commonmark.HtmlRenderer();

        const parsed = reader.parse(data);

        const result = writer.render(parsed);
        res.send(result);
    });
});

module.exports = router;
