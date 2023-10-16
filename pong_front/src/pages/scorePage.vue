<template>
  <div>
    <h3> Partite totali : {{games.length}}</h3>
    <table>
      <thead>
        <tr>
          <th>Giocatore 1</th>
           <th>Punteggio</th>
          <th>Giocatore 2</th>
          <th>Punteggio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="game in games" :key="game.id">
          <td>{{ game.IDplayer1 }}</td>
          <td>{{ game.score1 }}</td>
          <td>{{ game.IDplayer2 }}</td>
          <td>{{ game.score2 }}</td>
        </tr>
      </tbody>
    </table>
    <h3>statistiche giocatori</h3>
    <table>
      <thead>
        <tr>
          <th>Nome del giocatore</th>
          <th>Partite giocate</th>
          <th>Vittorie</th>
          <th>Sconfitte</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{ player.nome }}</td>
          <td>{{ player.partite }}</td>
          <td>{{ player.vittorie }}</td>
          <td>{{ player.sconfitte }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { api } from 'boot/axios'

export default {
  data () {
    return {
      games: [], // Inizialmente vuoto, verrà popolato con i dati dell'API
      players: []
    }
  },
  mounted () {
    // eslint-disable-next-line no-undef
    api.get('/games/')
      .then(response => {
        this.games = response.data
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error)
      })
    api.get('/players/all')
      .then(response => {
        this.players = response.data
      })
      .catch(error => {
        console.error('Si è verificato un errore:', error)
      })
  }
}
</script>
