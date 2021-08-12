const express = require('express');
const router = express.Router();

/**
 * @route /api/steps
 * @returns html
 */
router.get('/', (req, res) => {
    res.send(`
        <h2>Article</h2>
        <p>Testing express pour autre chose que react</p>
    `);
});

module.exports = router;
