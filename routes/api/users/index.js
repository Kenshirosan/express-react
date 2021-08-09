const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

/**
 * @route '/api/users
 */
router.get('/', auth, (req, res) => {
    res.json({ msg: 'Message depuis le fichier index' });
});

module.exports = router;
