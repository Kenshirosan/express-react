const fs = require('fs');
const express = require('express');
const router = express.Router();
const commonmark = require('commonmark');
/**
 * @route /api/steps
 * @returns html
 */
router.get('/', (req, res) => {
    fs.readFile('routes/api/steps/steps.md', 'utf-8', function (err, data) {
        const reader = new commonmark.Parser();
        const writer = new commonmark.HtmlRenderer();

        const parsed = reader.parse(data);

        const result = writer.render(parsed);
        res.send(result);
    });
});

module.exports = router;
