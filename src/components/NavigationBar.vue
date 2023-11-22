<!-- Original style by G. Rohit -->
<!-- https://codepen.io/grohit/pen/jObGzdG -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <nav class="navigation">
    <ul class="navigation__items">
      <li><router-link to="/" data-item="Home">Home</router-link></li>
      <li>
        <router-link to="/login" data-item="Login" v-if="!authStore.user.isLogged"
          >Login</router-link
        >
      </li>
      <li>
        <router-link to="/register" data-item="Register" v-if="!authStore.user.isLogged"
          >Register</router-link
        >
      </li>

      <li>
        <span data-item="Logout" @click="authStore.logout" v-if="authStore.user.isLogged">
          Logout
        </span>
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
