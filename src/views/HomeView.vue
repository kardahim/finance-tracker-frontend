<script setup lang="ts">
import { useIncomeStore } from '@/stores/income'
import { useExpenseStore } from '@/stores/expense'
import dayjs from 'dayjs'
import router from '@/router'

const incomeStore = useIncomeStore()
incomeStore.getIncomeList()

const expenseStore = useExpenseStore()
expenseStore.getExpenseList()

// TODO add statistics
// TODO add rwd
</script>

<template>
  <main class="home">
    <div class="home__card">
      <h1 class="home__card__title">Income</h1>
      <table class="home__card__table">
        <thead class="home__card__table__head">
          <td>Name</td>
          <td>Amount</td>
          <td>Date</td>
          <td>Income source</td>
          <td>Action</td>
        </thead>
        <tbody class="home__card__table__body">
          <tr v-for="income in incomeStore.income" :key="income.id!">
            <td>{{ income.name }}</td>
            <td>{{ income.amount }}</td>
            <td>{{ dayjs(income.date).format('DD/MM/YYYY') }}</td>
            <td>{{ income.incomeSource.name }}</td>
            <td>
              <div class="home__card__table__body__btn-action">
                <button @click="incomeStore.deleteIncome(income.id!)">Delete</button>
                <button @click="router.push(`/income/edit/${income.id!}`)">Edit</button>
              </div>
            </td>
          </tr>
          <tr class="home__card__table__body__btn-row">
            <td colspan="100%">
              <button @click="router.push('/income/new')">Add new income</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="home__card">
      <h1 class="home__card__title">Expenses</h1>
      <table class="home__card__table">
        <thead class="home__card__table__head">
          <td>Name</td>
          <td>Amount</td>
          <td>Date</td>
          <td>Expense source</td>
          <td>Action</td>
        </thead>
        <tbody class="home__card__table__body">
          <tr v-for="expense in expenseStore.expenses" :key="expense.id!">
            <td>{{ expense.name }}</td>
            <td>{{ expense.amount }}</td>
            <td>{{ dayjs(expense.date).format('DD/MM/YYYY') }}</td>
            <td>{{ expense.expenseSource.name }}</td>
            <td>
              <div class="home__card__table__body__btn-action">
                <button @click="incomeStore.deleteIncome(expense.id!)">Delete</button>
                <button @click="router.push(`/expense/edit/${expense.id!}`)">Edit</button>
              </div>
            </td>
          </tr>
          <tr class="home__card__table__body__btn-row">
            <td colspan="100%">
              <button @click="router.push('/expense/new')">Add new expense</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.home {
  display: grid;
  grid-template-columns: auto auto;

  &__card {
    box-shadow: $main-box-shadow;
    height: auto;
    padding: 60px;
    border-radius: 10px;
    margin: 0 30px;

    &__title {
      text-transform: uppercase;
      margin-bottom: 50px;
      text-align: center;
    }

    &__table {
      td {
        border: 1px solid $sub-text-color;
        padding: 20px;

        button {
          width: 100%;
          background-color: $accent-color;
          font-size: 1.2rem;
          cursor: pointer;
          outline: none;
          border: none;
          font-weight: 800;

          &:hover {
            background-color: $accent-color-hover;
          }
        }
      }
      &__head {
        font-weight: 800;
        text-transform: uppercase;
        text-align: center;
        td {
          padding: 10px 20px;
        }
      }
      &__body {
        &__btn-action {
          display: flex;
          gap: 10px;
          height: 50px;
          width: 200px;
        }

        tr:hover {
          font-weight: 800;
        }

        &__btn-row {
          td {
            border: none;
            padding: 0;
          }
          button {
            margin-top: 15px;
            height: 40px;
            width: 100%;
            font-size: 1.2rem;
            cursor: pointer;
            outline: none;
            border: none;
            background-color: $accent-color;
            font-weight: 800;
          }
        }
      }
    }
  }
}
</style>
