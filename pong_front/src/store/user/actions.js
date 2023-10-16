import { api } from 'boot/axios'

export async function login ({ commit }, payload) {
  const { nome, password, nome2, password2 } = payload
  const { data } = await api.put('/players/login', {
    nome,
    password,
    nome2,
    password2
  })
  // The btoa() method creates a Base64-encoded ASCII string from a binary string
  // (i.e., a string in which each character in the string is treated as a byte of binary data).
  commit('setToken', data.token)
  commit('setDetails', data.users)
  return data.users
}

export async function logout ({ commit }) {
  commit('setToken', null)
  commit('setDetails', {})
}
