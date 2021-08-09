const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const User = require('../../../models/User');
/**
 * @route '/api/users/currentUser'
 */
router.get('/', auth, async (req, res) => {
    const { id } = req.user;

    const user = await User.findOne({ _id: id }).select(['-password']);

    res.json({ user });
});

module.exports = router;
