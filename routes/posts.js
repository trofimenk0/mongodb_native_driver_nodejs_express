const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('We are on posts!');
});

module.exports = router;