const bcrypt = require('bcryptjs');
const models = require('./players_model.js');
const jwt = require('jsonwebtoken');
module.exports = {
  async createPlayer(req, res) {
    try {
      if(await models.findPlayerByName(req.body.nome)){
        console.log(models.findPlayerByName(req.body.nome))
        res.status(406).send('esiste gia')
      }else{
      await models.insertPlayer(
        req.body.nome,
        req.body.password
      );
      res.status(200).send('Inserito');
      }
    } catch (error) {
      res.status(500).send("C'è stato un problema");
    }
  },
  async loginPlayer(req, res) {
    try {
      const { nome, password ,nome2 , password2} = req.body;
      const player = await models.findPlayerByName(nome);
      const player2 = await models.findPlayerByName(nome2);
      if (!player || !bcrypt.compareSync(password, player.password)) {
        return res.status(401).send("G1 le tue Credenziali non sono valide. Controlla il tuo nome utente e la password.");
      }
      if (!player2 || !bcrypt.compareSync(password2, player2.password)) {
        return res.status(401).send("G2 le tue Credenziali non sono valide. Controlla il tuo nome utente e la password.");
      }

      const token = jwt.sign({ ID1: player.ID ,name1: player.nome, ID2: player2.ID ,name2: player2.nome }, 'your-secret-key');
      const users = { ID1: player.ID ,name1: player.nome, ID2: player2.ID ,name2: player2.nome} 
      res.status(200).json({ token , users});

    } catch (error) {
      console.error(error);
      res.status(500).send("C'è stato un problema durante l'accesso.");
    }
  },


  async findPlayer(req, res) {
    const playerId = req.params.id;
    try {
      const player = await models.findPlayerById(playerId);
      if (player) {
        res.status(200).send(player);
      } else {
        res.status(404).send('Nessun giocatore trovato con questo ID');
      }
    } catch (error) {
      res.status(500).send("C'è stato un problema");
    }
  },
  async getAllPlayers(req, res) {
    try {
        const players = await models.getAllPlayers();
        res.status(200).send(players);
    } catch (error) {
      res.status(500).send("C'è stato un problema");
    }
  },
};
