<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useIncomeStore } from '@/stores/income'
import { useExpenseStore } from '@/stores/expense'

const authStore = useAuthStore()

const incomeStore = useIncomeStore()
incomeStore.getIncomeList()

const expenseStore = useExpenseStore()
expenseStore.getExpenseList()
</script>

<template>
  <main class="home">
    <div class="home__card">
      <h1 class="home__card__title">Income</h1>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi repellat esse excepturi
        tempore quibusdam molestias harum neque, accusantium nulla ex, possimus, quia eaque
        accusamus eos perspiciatis. Obcaecati facere quas itaque! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Modi repellat esse excepturi tempore quibusdam molestias harum
        neque, accusantium nulla ex, possimus, quia eaque accusamus eos perspiciatis. Obcaecati
        facere quas itaque! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi repellat
        esse excepturi tempore quibusdam molestias harum neque, accusantium nulla ex, possimus, quia
        eaque accusamus eos perspiciatis. Obcaecati facere quas itaque!
      </div>
    </div>
    <div class="home__card">
      <h1 class="home__card__title">Expense</h1>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi repellat esse excepturi
        tempore quibusdam molestias harum neque, accusantium nulla ex, possimus, quia eaque
        accusamus eos perspiciatis. Obcaecati facere quas itaque! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Modi repellat esse excepturi tempore quibusdam molestias harum
        neque, accusantium nulla ex, possimus, quia eaque accusamus eos perspiciatis. Obcaecati
        facere quas itaque! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi repellat
        esse excepturi tempore quibusdam molestias harum neque, accusantium nulla ex, possimus, quia
        eaque accusamus eos perspiciatis. Obcaecati facere quas itaque!
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import '../assets/styles/variables.scss';

.home {
  display: grid;
  grid-template-columns: auto auto;
  gap: 50px;

  &__card {
    box-shadow: $main-box-shadow;
    max-width: 500px;
    height: auto;
    padding: 60px;
    border-radius: 10px;
    margin: 0 30px;

    &__title {
      text-transform: uppercase;
      margin-bottom: 50px;
      text-align: center;
    }
  }
}
</style>
