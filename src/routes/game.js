const express = require('express');
const router = express.Router();

router.get('/game/start', (req, res) =>{
    res.render('game/start');
});

module.exports = router;