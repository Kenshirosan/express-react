const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Mettre à jour l'utilisateur ici
    // On

    res.json({ msg: 'Message depuis le fichier update' });
});

module.exports = router;
