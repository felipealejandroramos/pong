<template>
  <div>
    <h1>Tabella dei giocatori</h1>
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
      players: []
    }
  },
  created () {
    this.fetchPlayerData()
  },
  methods: {
    async fetchPlayerData () {
      try {
        const response = await api.get('/players/all')
        const data = await response.json()
        this.players = data
      } catch (error) {
        console.error('Errore durante il recupero dei dati dei giocatori:', error)
      }
    }
  }
}
</script>
