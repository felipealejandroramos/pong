<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <q-form @submit="register">
          <q-input v-model="formData.nome" label="Nome" />
          <q-input v-model="formData.password" type="password" label="Password" />
          <q-btn type="submit" label="Registrati" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { defineComponent, ref } from 'vue'
import { api } from 'boot/axios'
export default defineComponent({
  name: 'registerPage',
  data () {
    return {
      formData: {
        nome: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      try {
        const response = await api.post('players/new', this.formData)
        console.log(response)
      } catch (error) {
        console.error('Errore durante la registrazione:', error)
      }
    }
  }
})
</script>
