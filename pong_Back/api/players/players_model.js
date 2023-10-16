const bcrypt = require('bcryptjs');
const saltRounds = 10;
const db = require('../../db.js');
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      ID INTEGER PRIMARY KEY,
      nome TEXT,
      password TEXT,
      vittorie INTEGER,
      sconfitte INTEGER,
      partite INTEGER
    )
  `);
});

function insertPlayer(nome, password) {
  var vittorie = 0;
  var sconfitte = 0;
  var partite = 0;
  
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, async function(err, hash) {
      if (err) {
        reject(err);
      } else {
        const stmt = db.prepare(`
          INSERT INTO players (nome, password, vittorie, sconfitte, partite)
          VALUES (?, ?, ?, ?, ?)
        `);
        
        stmt.run(nome, hash, vittorie, sconfitte, partite, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
          stmt.finalize();
        });
      }
    });
  });
}


function findPlayerById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM players WHERE ID = ?', id, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
function findPlayerByName(nome) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM players WHERE nome = ?', nome, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getAllPlayers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM players', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
function increaseGamesPlayed(IDplayer) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE players SET partite = partite + 1 WHERE ID = ?',
      IDplayer,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
function increaseWins(IDplayer) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE players SET vittorie = vittorie + 1 WHERE ID = ?',
      IDplayer,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
function increaseLosses(IDplayer) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE players SET sconfitte = sconfitte + 1 WHERE ID = ?',
      IDplayer,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}



module.exports = {
  insertPlayer,
  findPlayerById,
  getAllPlayers,
  increaseGamesPlayed,
  increaseLosses,
  increaseWins,
  findPlayerByName,
};
