const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

/**
 * @route '/api/users/auth
 */
router.get('/', auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id })
        .select(['-password'])
        .populate('role', 'name');

    res.status(200).json({ user });
});

module.exports = router;
