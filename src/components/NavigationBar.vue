<!-- Original style by G. Rohit -->
<!-- https://codepen.io/grohit/pen/jObGzdG -->
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogin = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__items">
      <li><router-link to="/" data-item="Home">Home</router-link></li>
      <li v-if="!authStore.user.isLogged">
        <router-link to="/login" data-item="Login">Login</router-link>
      </li>
      <li v-if="!authStore.user.isLogged">
        <router-link to="/register" data-item="Register">Register</router-link>
      </li>

      <li v-if="authStore.user.isLogged">
        <span data-item="Logout" @click="handleLogin"> Logout </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';
.navigation {
  width: 100%;
  background: $background-color;
  // position: fixed;
  box-shadow: $main-box-shadow;

  &__items {
    list-style: none;
    display: flex;

    li {
      margin: 25px;

      a,
      span {
        cursor: pointer;
        text-decoration: none;
        color: $sub-text-color;
        font-size: 24px;
        font-weight: 400;
        transition: all 0.5s ease-in-out;
        position: relative;
        text-transform: uppercase;

        &::before {
          content: attr(data-item);
          transition: 0.5s;
          color: $accent-color;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 0;
          overflow: hidden;
        }

        &:hover {
          &::before {
            width: 100%;
            transition: all 0.5s ease-in-out;
          }
        }
      }
    }
  }
}
</style>
