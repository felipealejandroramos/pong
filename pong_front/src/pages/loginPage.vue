<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="handleLogin">
          <q-input v-model="formData.nome" label="Nome G1" />
          <q-input v-model="formData.password" type="password" label="Password G1" />
          <q-input v-model="formData.nome2" label="Nome G2" />
          <q-input v-model="formData.password2" type="password" label="Password G2" />
          <q-btn type="submit" label="Login" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'loginPage',
  data () {
    return {
      formData: {
        nome: '',
        password: '',
        nome2: '',
        password2: ''
      }
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    async handleLogin () {
      try {
        await this.login(this.formData)
        console.log('Login avvenuto con successo')
      } catch (error) {
        console.error('Errore durante il login:', error)
      }
    }
  }
})
</script>
