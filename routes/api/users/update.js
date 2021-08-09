const express = require('express');
const router = express.Router();

// !! Penser au middleware auth !!
router.post('/', (req, res) => {
    // Mettre à jour l'utilisateur ici
    //
    console.log(req.body);

    res.json({ msg: 'Message depuis le fichier update' });
});

module.exports = router;
