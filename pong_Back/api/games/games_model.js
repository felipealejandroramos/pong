const db = require('../../db.js');

db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS games (
        Digame INTEGER PRIMARY KEY,
        IDplayer1 INTEGER,
        IDplayer2 INTEGER,
        score1 INTEGER,
        score2 INTEGER,
        FOREIGN KEY (IDplayer1) REFERENCES players(ID),
        FOREIGN KEY (IDplayer2) REFERENCES players(ID)
      )
    `);
  });


  function insertGame(IDplayer1, IDplayer2, score1, score2) {
    // Verifica se gli ID dei giocatori esistono nella tabella "players" prima di inserire il gioco
    const checkPlayersQuery = 'SELECT COUNT(*) AS playerCount FROM players WHERE ID IN (?, ?)';
    
    return new Promise((resolve, reject) => {
      db.get(checkPlayersQuery, [IDplayer1, IDplayer2], (err, row) => {
        if (err) {
          reject(err);
        } else {
          const playerCount = row.playerCount;
  
          if (playerCount !== 2) {
            // Almeno uno dei giocatori non esiste, quindi non inserire il gioco
            reject('Almeno uno dei giocatori non esiste');
          } else {
            // Entrambi gli ID dei giocatori esistono, inserisci il gioco
            db.run(
              'INSERT INTO games (IDplayer1, IDplayer2, score1, score2) VALUES (?, ?, ?, ?)',
              [IDplayer1, IDplayer2, score1, score2],
              function (err) {
                if (err) {
                  reject(err);
                } else {
                  resolve(this.lastID);
                }
              }
            );
          }
        }
      });
    });
  }
  
  function getAllGamesForPlayer(IDplayer) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM games WHERE IDplayer1 = ? OR IDplayer2 = ?',
        [IDplayer, IDplayer],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  function getAllGames() {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM games ',
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }



  module.exports = {
    insertGame,
    getAllGamesForPlayer,
    getAllGames

  }
