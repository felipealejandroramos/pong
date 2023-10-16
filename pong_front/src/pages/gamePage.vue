<style>
.container {
  display: flex;
}

.leftscore {
  display: flex;
  justify-content: left;
  align-items: left;
}

.rightscore {
  display: flex;
  justify-content: right;
  align-items: right;
}
</style>
<template>
  <header>
    <div class="container flex-center ">
      <div class=" leftscore flex-start ">
        <h2 style="color: #757474;"> {{ G1 }} score: {{ players[0].score }}      - </h2>
      </div>
      <div class="rightscore flex-end">
        <h2 style="color: #757474">  {{ G2 }} score: {{ players[1].score }} </h2>
      </div>
    </div>
  </header>
  <main>
  <q-page class="flex flex-center">
    <canvas id="canvas" width="1000" height="500"
      style="border:1px solid #757474; align-self: center; background-color: #000000;"></canvas>
    </q-page>
  </main>
  <audio ref="wallSound" src="../../public/wall.mp3"></audio>
  <audio ref="paddleSound" src="../../public/paddle.mp3"></audio>
  <audio ref="pointSound" src="../../public/point.mp3"></audio>
</template>
<script>
import { api } from 'boot/axios'
export default {
  name: 'App',
  data () {
    return {
      ball: {
        position: [500, 250],
        movement: [0, 0]
      },
      players: [{
        score: 0,
        position: 200
      }, {
        score: 0,
        position: 200
      }],
      canvas: null,
      keyStates: {
        w: false,
        x: false,
        i: false,
        m: false
      }

    }
  },
  methods: {
    handleKeyDown (event) {
      this.keyStates[event.key] = true
    },
    handleKeyUp (event) {
      this.keyStates[event.key] = false
    },
    checkifbetween (x, min, max) {
      return x >= min && x <= max
    },
    movePlayerUp (playerIndex) {
      this.canvas.clearRect(0, 0, 1000, 500)
      this.players[playerIndex].position -= 5
    },
    movePlayerDown (playerIndex) {
      this.canvas.clearRect(0, 0, 1000, 500)
      this.players[playerIndex].position += 5
    },
    drawBall () {
      this.canvas.fillStyle = 'white'
      this.canvas.fillRect(this.ball.position[0], this.ball.position[1], 10, 10)
    },
    deleteBall () {
      // Cancella il disegno precedente della pallina
      this.canvas.clearRect(this.ball.position[0], this.ball.position[1], 10, 10)
    },
    drawPaddles () {
      this.canvas.fillStyle = 'white'
      this.canvas.fillRect(100, this.players[0].position, 9, 100)
      this.canvas.fillRect(900, this.players[1].position, 9, 100)
      this.canvas.fillRect(500, 0, 3, 500)
    },
    moveBall () {
      this.ball.position[0] += this.ball.movement[0]
      this.ball.position[1] += this.ball.movement[1]
    },
    hitpaddle (n) {
      const ballX = this.ball.position[0]
      const ballY = this.ball.position[1]
      const paddle = this.players[n - 1]

      if (n === 1) {
        // Hit control for Player 1's paddle
        if (
          ballX < 105 && // Consider the left side of the Player 1's area
      ballY >= paddle.position &&
      ballY <= paddle.position + 100
        ) {
          // The ball hit Player 1's paddle
          if (this.checkifbetween(ballY, paddle.position, paddle.position + 40)) {
            this.ball.movement[1] = this.ball.movement[1] - 1
          } else if (this.checkifbetween(ballY, paddle.position + 60, paddle.position + 100)) {
            this.ball.movement[1] = this.ball.movement[1] + 1
          }

          this.ball.movement[0] = -this.ball.movement[0] // Change horizontal direction
          const paddleSound = this.$refs.paddleSound
          paddleSound.play()
        }
      } else if (n === 2) {
        // Hit control for Player 2's paddle
        if (
          ballX > 895 && // Consider the right side of the Player 2's area
      ballY >= paddle.position &&
      ballY <= paddle.position + 100
        ) {
          // The ball hit Player 2's paddle
          if (this.checkifbetween(ballY, paddle.position, paddle.position + 40)) {
            this.ball.movement[1] = this.ball.movement[1] - 1
          } else if (this.checkifbetween(ballY, paddle.position + 60, paddle.position + 100)) {
            this.ball.movement[1] = this.ball.movement[1] + 1
          }
          this.ball.movement[0] = -this.ball.movement[0]// Change horizontal direction
          const paddleSound = this.$refs.paddleSound
          paddleSound.play()
        }
      }
    },
    scorePoint (player) {
      const pointSound = this.$refs.pointSound
      pointSound.play()
      player.score += 1
    },
    update () {
      // Aggiorna la posizione della pallina
      this.deleteBall()
      this.drawPaddles()
      this.moveBall()
      if (this.isAPaddleHitted) {
        this.hitpaddle(this.isAPaddleHitted)
      } else {
        this.drawBall()
      }
      // Controlla se la pallina ha colpito un bordo
      if (this.ball.position[0] < 0) {
        this.scorePoint(this.players[1])
        this.deleteBall()
        this.ball.position = [500, 250]
        this.ball.movement = [5, 0]
      } else if (this.ball.position[0] > this.canvas.canvas.width) {
        this.scorePoint(this.players[0])
        this.deleteBall()
        this.ball.position = [500, 250]
        this.ball.movement = [-5, 0]
      }
      if (this.ball.position[1] < 0 || this.ball.position[1] > this.canvas.canvas.height) {
        this.ball.movement[1] = -this.ball.movement[1]
        const wallSound = this.$refs.wallSound
        wallSound.play()
      }
      // Controlla se il gioco è finito
      if (this.isGameOver) {
        const userDetails = this.$store.getters['user/details']
        this.ball.position = [500, 250]
        this.ball.movement = [0, 0]
        let x = ''
        if (this.players[0].score === 21) {
          x = this.G1
        } else if (this.players[1].score === 21) {
          x = this.G2
        }
        alert('vince ' + x)
        if (userDetails.name1 && userDetails.name2) {
          const data = { IDplayer1: userDetails.ID1, IDplayer2: userDetails.ID2, score1: this.players[0].score, score2: this.players[1].score }
          api.post('/games/new', data)
        }
        this.players[0].score = 0
        this.players[1].score = 0
        this.ball.movement = [5, 0]
      }
      // Richiama il metodo update per continuare ad aggiornare il gioco
      requestAnimationFrame(this.update)
    }
  },
  computed: {
    G1 () {
      const userDetails = this.$store.getters['user/details']
      if (userDetails && userDetails.name1) {
        return userDetails.name1
      }
      return 'player 1'
    },
    G2 () {
      const userDetails = this.$store.getters['user/details']
      if (userDetails && userDetails.name2) {
        return userDetails.name2
      }
      return 'player 2'
    },
    isGameOver () {
      return this.players[0].score === 21 || this.players[1].score === 21
    },
    isAPaddleHitted () {
      switch (this.ball.position[0]) {
        case 100:
          if (this.checkifbetween(this.ball.position[1], this.players[0].position, this.players[0].position + 100)) {
            return 1
          }

        // eslint-disable-next-line no-fallthrough
        case 900:
          if (this.checkifbetween(this.ball.position[1], this.players[1].position, this.players[1].position + 100)) {
            return 2
          }
        // eslint-disable-next-line no-fallthrough
        default:
          return false
      }
    }
  },
  mounted () {
    this.canvas = document.querySelector('#canvas').getContext('2d')

    this.drawPaddles()
    this.drawBall()

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'w':
          this.movePlayerUp(0)
          break
        case 'x':
          this.movePlayerDown(0)
          break
        case 'i':
          this.movePlayerUp(1)
          break
        case 'm':
          this.movePlayerDown(1)
          break
      }
    })
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)

    // Aggiungi un nuovo ascoltatore per gli eventi di pressione e rilascio del tasto
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)

    this.ball.movement = [5, 0]
    // Avvia il loop di gioco
    requestAnimationFrame(this.update)
  }
}
</script>
