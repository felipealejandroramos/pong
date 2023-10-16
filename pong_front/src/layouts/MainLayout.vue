<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Pong
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <h5 v-if="names">Partita di {{ names }}</h5>
      <q-list>
        <div class="d-flex flex-column">
          <q-btn
            @click="navigateTo('/game')"
            class="p-3"
            style="width: 100%;"
          >
            Game
          </q-btn>
          <q-btn
            @click="navigateTo('/scores')"
            class="p-3"
            style="width: 100%;"
          >
            Scores
          </q-btn>
          <div class="d-flex flex-row">
            <q-btn
              @click="navigateTo('/login')"
              class="p-3"
              style="width: 50%;"
            >
              Login
            </q-btn>
            <q-btn
              @click="navigateTo('/register')"
              class="p-3"
              style="width: 50%;"
            >
              Register
            </q-btn>
          </div>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'MainLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter()

    const navigateTo = (route) => {
      router.push(route)
      leftDrawerOpen.value = false
    }

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      navigateTo,
      toggleLeftDrawer
    }
  },
  computed: {
    names () {
      const userDetails = this.$store.getters['user/details']
      console.log(userDetails)
      if (userDetails && userDetails.name1 && userDetails.name2) {
        return userDetails.name1 + ' e ' + userDetails.name2
      }
      return false
    }

  }

})
</script>
