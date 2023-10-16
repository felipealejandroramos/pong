const players = require("./players/players_router")
const games = require("./games/games_router")
const express = require("express");

const router = express.Router();

router.use('/players',players)
router.use('/games',games)

module.exports = router;