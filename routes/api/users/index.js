const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

router.get('/', auth, (req, res) => {
    res.json({ msg: 'Message depuis le fichier index' });
});

module.exports = router;
