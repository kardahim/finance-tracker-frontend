<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import { incomeExpenseValidationSchema } from '../assets/validation/incomeExpenseValidationSchema'
import { useIncomeStore } from '@/stores/income'

const incomeStore = useIncomeStore()
incomeStore.getIncomeSources()

function onSubmit(values: any) {
  incomeStore.createNewIncome(values)
}
</script>

<template>
  <Form
    class="income"
    @submit="onSubmit"
    :validation-schema="incomeExpenseValidationSchema"
    v-slot="{ errors, isSubmitting }"
  >
    <h1 class="income__title">New Income</h1>
    <div class="income__item">
      <label for="name" class="income__item__label">Name</label>
      <Field
        id="name"
        name="name"
        type="text"
        class="income__item__input"
        :class="{ 'is-invalid': errors.name }"
      />
      <div class="income__item__error">{{ errors.name }}</div>
    </div>
    <div class="income__item">
      <label for="amount" class="income__item__label">Amount</label>
      <Field
        id="amount"
        min="1"
        name="amount"
        type="number"
        class="income__item__input"
        :class="{ 'is-invalid': errors.amount }"
      />
      <div class="income__item__error">{{ errors.amount }}</div>
    </div>
    <div class="income__item">
      <label for="date" class="income__item__label">Date</label>
      <Field
        id="date"
        min="1"
        name="date"
        type="date"
        :value="new Date().toISOString().substr(0, 10)"
        class="income__item__input"
        :class="{ 'is-invalid': errors.date }"
      />
      <div class="income__item__error">{{ errors.date }}</div>
    </div>
    <div class="income__item">
      <label for="date" class="income__item__label">Income source</label>
      <Field
        as="select"
        id="sourceId"
        name="sourceId"
        class="income__item__input"
        :class="{ 'is-invalid': errors.sourceId }"
      >
        <!-- should be selected... -->
        <option v-for="source in incomeStore.incomeSources" :key="source.id!" :value="source.id">
          {{ source.name }}
        </option>
      </Field>
      <div class="income__item__error">{{ errors.sourceId }}</div>
    </div>
    <div class="income__item">
      <button class="income__item__button" :disabled="isSubmitting">Add</button>
    </div>
  </Form>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';
.income {
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
