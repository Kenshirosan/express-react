const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: 'Message depuis le fichier update' });
});

module.exports = router;
