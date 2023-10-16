const gamemodel = require('./games_model')
const playermodel = require('../players/players_model')
async function findNameWithId(id) {
  const player = await playermodel.findPlayerById(id);
  return player.nome;
}
module.exports ={
    async creategame(req, res) {
        try {
          const { IDplayer1, IDplayer2, score1, score2 } = req.body;
            
          const gameID = await gamemodel.insertGame(IDplayer1, IDplayer2, score1, score2);
          
          playermodel.increaseGamesPlayed(IDplayer1)
          playermodel.increaseGamesPlayed(IDplayer2)
          if(score1>score2){
            playermodel.increaseWins(IDplayer1)
            playermodel.increaseLosses(IDplayer2)
          }else{
            playermodel.increaseWins(IDplayer2)
            playermodel.increaseLosses(IDplayer1)
          }


          res.status(201).send(`Gioco creato con ID ${gameID}`);
        } catch (error) {
          res.status(500).send("C'è stato un problemae");
        }
      },
      
    async getAllGamesOfaPlayer(req, res) {
        try {
            const games = await gamemodel.getAllGamesForPlayer(req.params.id);
            const gamesWithNames = await Promise.all(
              games.map(async (game) => {
                game.IDplayer1 = await findNameWithId(game.IDplayer1);
                game.IDplayer2 = await findNameWithId(game.IDplayer2);
                return game
              })
            );
            res.status(200).send(gamesWithNames);
        } catch (error) {
          res.status(500).send("C'è stato un problema");
        }
      },
    async getAllGames(req, res) {
        try {
            const games = await gamemodel.getAllGames();
            console.log(games.length )
            const gamesWithNames = await Promise.all(
              games.map(async (game) => {
                game.IDplayer1 = await findNameWithId(game.IDplayer1);
                game.IDplayer2 = await findNameWithId(game.IDplayer2);
                return game
              })
            );
  
            res.status(200).send(gamesWithNames);
        } catch (error) {
          res.status(500).send("C'è stato un problema");
        }
      },
}