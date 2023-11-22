<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import { loginValidationSchema } from '../assets/validation/loginValidationSchema'
import { useAuthStore } from '@/stores/auth'

function onSubmit(values: any) {
  const authStore = useAuthStore()
  authStore.login(values)
}
</script>

<template>
  <Form
    class="login"
    @submit="onSubmit"
    :validation-schema="loginValidationSchema"
    v-slot="{ errors, isSubmitting }"
  >
    <h1 class="login__title">Sign in</h1>
    <div class="login__item">
      <label for="email" class="login__item__label">Email</label>
      <Field
        id="email"
        name="email"
        type="text"
        class="login__item__input"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="login__item__error">{{ errors.email }}</div>
    </div>
    <div class="login__item">
      <label for="password" class="login__item__label">Password</label>
      <Field
        id="password"
        name="password"
        type="password"
        class="login__item__input"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="login__item__error">{{ errors.password }}</div>
    </div>
    <div class="login__item login__item--flex">
      <button class="login__item__button" :disabled="isSubmitting">Log in</button>
      <router-link to="/register">Register</router-link>
    </div>
  </Form>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';
.login {
  box-shadow: $main-box-shadow;
  max-width: 500px;
  height: auto;
  padding: 60px;
  border-radius: 10px;
  margin: 0 30px;

  &__title {
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 50px;
  }

  &__item {
    margin-bottom: 20px;

    &__label {
      font-size: 1.1rem;
      display: block;
      margin-bottom: 10px;
    }

    &__input {
      width: 100%;
      height: 40px;
      font-size: 2rem;
      outline: none;

      &:focus {
        border: black solid 2px;
      }
    }

    &__button {
      margin-top: 10px;
      height: 40px;
      width: 50%;
      text-transform: uppercase;
      transition: all 0.5s ease-in-out;
      cursor: pointer;
      outline: none;
      border: none;
      font-size: 1.1rem;
      background-color: $accent-color;
      color: black;
      font-weight: 800;
    }

    &__error {
      height: 10px;
      color: $accent-color;
      margin-top: 10px;
      font-style: italic;
    }
  }

  &__item--flex {
    display: flex;
    gap: 30px;
    align-items: baseline;

    a {
      transition: all 0.5s ease-in-out;
      color: $text-color;

      &:hover {
        color: $sub-text-color;
      }
    }
  }
}
</style>
