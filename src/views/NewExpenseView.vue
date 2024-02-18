<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { incomeExpenseValidationSchema } from '../assets/validation/incomeExpenseValidationSchema'
import { useExpenseStore } from '@/stores/expense'
import router from '@/router'

const expenseStore = useExpenseStore()
await expenseStore.getExpenseSources()

function onSubmit(values: any) {
  expenseStore.createNewExpense(values)
}
</script>

<template>
  <Form
    class="expense"
    @submit="onSubmit"
    :validation-schema="incomeExpenseValidationSchema"
    v-slot="{ errors, isSubmitting }"
  >
    <h1 class="expense__title">New Expense</h1>
    <div class="expense__item">
      <label for="name" class="expense__item__label">Name</label>
      <Field
        id="name"
        name="name"
        type="text"
        class="expense__item__input"
        :class="{ 'is-invalid': errors.name }"
      />
      <ErrorMessage name="name" class="expense__item__error" as="div" />
    </div>
    <div class="expense__item">
      <label for="amount" class="expense__item__label">Amount</label>
      <Field
        id="amount"
        min="1"
        name="amount"
        type="number"
        class="expense__item__input"
        :class="{ 'is-invalid': errors.amount }"
      />
      <ErrorMessage name="amount" class="expense__item__error" as="div" />
    </div>
    <div class="expense__item">
      <label for="date" class="expense__item__label">Date</label>
      <Field
        id="date"
        min="1"
        name="date"
        type="date"
        :value="new Date().toISOString().substr(0, 10)"
        class="expense__item__input"
        :class="{ 'is-invalid': errors.date }"
      />
      <ErrorMessage name="date" class="expense__item__error" as="div" />
    </div>
    <div class="expense__item">
      <label for="date" class="expense__item__label">Expense source</label>
      <Field
        as="select"
        id="sourceId"
        name="sourceId"
        class="expense__item__input"
        :class="{ 'is-invalid': errors.sourceId }"
        :value="expenseStore.expenseSources[0].id"
      >
        <option v-for="source in expenseStore.expenseSources" :key="source.id!" :value="source.id">
          {{ source.name }}
        </option>
      </Field>
      <ErrorMessage name="sourceId" class="expense__item__error" as="div" />
    </div>
    <div class="expense__item expense__item--flex">
      <button class="expense__item__button" :disabled="isSubmitting">Add</button>
      <button class="expense__item__button" @click="router.push('/')">Cancel</button>
    </div>
  </Form>
</template>

<style scoped lang="scss">
@import '../assets/styles/variables.scss';
.expense {
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
