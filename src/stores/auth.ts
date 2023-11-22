import { ref } from 'vue'
import { defineStore } from 'pinia'
import myAxios from '@/helpers/axios'
import { type User } from '@/interfaces/user'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const initialUser = JSON.parse(localStorage.getItem('user') || '')

  const user = ref<User>({
    id: initialUser ? initialUser.id : null,
    firstName: initialUser ? initialUser.firstName : null,
    lastName: initialUser ? initialUser.lastName : null,
    email: initialUser ? initialUser.email : null,
    token: initialUser ? initialUser.token : null,
    refreshToken: initialUser ? initialUser.refreshToken : null,
    role: initialUser ? initialUser.role : null,
    isLogged: initialUser ? initialUser.isLogged : false
  })

  function login(data: { email: string; password: string }) {
    myAxios
      .post('/auth/signin', data)
      .then((response) => {
        user.value.id = response.data.user.id
        user.value.firstName = response.data.user.firstName
        user.value.lastName = response.data.user.lastName
        user.value.email = response.data.user.email
        user.value.token = response.data.token
        user.value.refreshToken = response.data.refreshToken
        user.value.role = response.data.user.role
        user.value.isLogged = true

        localStorage.setItem('user', JSON.stringify(user.value))

        router.push('/')
      })
      .catch((error) => {
        console.error('Login error:', error.message)
      })
  }

  return { login, user }
})