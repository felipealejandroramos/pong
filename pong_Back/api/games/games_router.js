const express = require("express");
const controllers = require("./games_controllers")
const router = express.Router();

router.get('/:id',controllers.getAllGamesOfaPlayer)
router.get('/',controllers.getAllGames)
router.post('/new',controllers.creategame)

module.exports = router;