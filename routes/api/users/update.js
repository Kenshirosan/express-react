const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
// !! Penser au middleware auth !!

/* TODO : Valider les champs et les assainnir  (Enlever les tags HTML et les scripts)  */

/**
 * @method POST
 * @route /api/users/update
 */
router.post('/', auth, async (req, res) => {
    // Mettre à jour l'utilisateur ici
    //
    try {
        const { name, avatar, email } = req.body;

        const { id } = req.user;

        const user = await User.findOne({ _id: id });

        user.name = name;
        user.avatar = avatar;
        user.email = email;
        user.updatedAt = new Date();
        await user.save();

        res.json({ msg: 'Update successful !', user });
    } catch (e) {
        res.status(500).json({ msg: "Un erreur s'est produite !" });
    }
});

module.exports = router;
