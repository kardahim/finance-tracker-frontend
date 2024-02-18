<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { registerValidationSchema } from '../assets/validation/registerValidationSchema'
import { useAuthStore } from '@/stores/auth'

function onSubmit(values: any) {
  const authStore = useAuthStore()
  authStore.register(values)
}
</script>

<template>
  <Form
    class="register"
    @submit="onSubmit"
    :validation-schema="registerValidationSchema"
    v-slot="{ errors, isSubmitting }"
  >
    <h1 class="register__title">Sign up</h1>
    <div class="register__item">
      <label for="firstName" class="register__item__label">Firstname</label>
      <Field
        id="firstName"
        name="firstName"
        type="text"
        class="register__item__input"
        :class="{ 'is-invalid': errors.firstName }"
      />
      <ErrorMessage name="firstName" class="register__item__error" as="div" />
    </div>
    <div class="register__item">
      <label for="lastName" class="register__item__label">Lastname</label>
      <Field
        id="lastName"
        name="lastName"
        type="text"
        class="register__item__input"
        :class="{ 'is-invalid': errors.lastName }"
      />
      <ErrorMessage name="lastName" class="register__item__error" as="div" />
    </div>
    <div class="register__item">
      <label for="email" class="register__item__label">Email</label>
      <Field
        id="email"
        name="email"
        type="text"
        class="register__item__input"
        :class="{ 'is-invalid': errors.email }"
      />
      <ErrorMessage name="email" class="register__item__error" as="div" />
    </div>
    <div class="register__item">
      <label for="password" class="register__item__label">Password</label>
      <Field
        id="password"
        name="password"
        type="password"
        class="register__item__input"
        :class="{ 'is-invalid': errors.email }"
      />
      <ErrorMessage name="password" class="register__item__error" as="div" />
    </div>
    <div class="register__item register__item--flex">
      <button class="register__item__button" :disabled="isSubmitting">Register</button>
      <router-link to="/login">Login</router-link>
    </div>
  </Form>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';
.register {
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

      &:hover {
        background-color: $accent-color-hover;
      }
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
