const express = require("express");
const controllers = require("./players_controllers");
const router = express.Router();

router.post('/new', controllers.createPlayer);
router.get('/all', controllers.getAllPlayers); 
router.get('/:id', controllers.findPlayer);
router.put('/login', controllers.loginPlayer)
//router.put('/modify');
//router.delete('/delete');

module.exports = router;
;