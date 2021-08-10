const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');

/**
 * @route '/api/users/destroy'
 */
router.post('/', auth, async (req, res) => {
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Votre compte a été supprimé !' });
});

module.exports = router;
