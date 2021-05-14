const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/', passport.authenticate('local', {session: false}), (req, res) => {
    res.json(req.user);
});

module.exports = router;