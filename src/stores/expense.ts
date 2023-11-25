import { defineStore } from 'pinia'
import myAxios from '@/helpers/axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'
import { type Expense } from '@/interfaces/expense'
import { type IncomeExpense } from '@/interfaces/incomeExpense'
import router from '@/router'

export const useExpenseStore = defineStore('expense', () => {
  const authStore = useAuthStore()
  const token = authStore.user.refreshToken

  const expenses = ref<[Expense]>([
    {
      id: null,
      name: null,
      amount: null,
      date: null,
      expenseSource: {
        id: null,
        name: null
      },
      userId: null
    }
  ])

  const singleExpense = ref<Expense>({
    id: null,
    name: null,
    amount: null,
    date: null,
    expenseSource: {
      id: null,
      name: null
    },
    userId: null
  })

  const expenseSources = ref<[{ id: number | null; name: string | null }]>([
    {
      id: null,
      name: null
    }
  ])

  function getExpenseList() {
    myAxios
      .get(`/expense/user/${authStore.user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const newRecords: [Expense] = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          date: item.date,
          expenseSource: {
            id: item.expenseSource.id,
            name: item.expenseSource.name
          },
          userId: item.user.id
        }))

        expenses.value = newRecords
      })
      .catch((error) => {
        console.error('Expense list error:', error)
      })
  }

  function deleteExpense(id: number) {
    myAxios
      .delete(`/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        getExpenseList()
      })
      .catch((error) => {
        console.error('Income delete error:', error)
      })
  }

  function getExpenseSources() {
    myAxios
      .get(`/expense-source`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        expenseSources.value = response.data
      })
      .catch((error) => {
        console.error('Expense sources error:', error)
      })
  }

  function createNewExpense(data: IncomeExpense) {
    data.userId = authStore.user.id

    myAxios
      .post(`/expense`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.error('Add expense error:', error)
      })
  }

  async function getExpenseById(id: number) {
    await myAxios
      .get(`/expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        singleExpense.value.id = response.data.id
        singleExpense.value.name = response.data.name
        singleExpense.value.amount = response.data.amount
        singleExpense.value.date = response.data.date
        singleExpense.value.expenseSource.id = response.data.expenseSource.id
        singleExpense.value.expenseSource.name = response.data.expenseSource.name
        singleExpense.value.userId = response.data.user.id
      })
      .catch((error) => {
        console.error('Expense get by id error:', error)
      })
  }

  function editIncome(id: number, data: IncomeExpense) {
    data.userId = authStore.user.id

    myAxios
      .put(`/expense/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.error('Edit expense error:', error)
      })
  }

  return {
    expenses,
    expenseSources,
    singleExpense,
    getExpenseList,
    deleteExpense,
    getExpenseSources,
    createNewExpense,
    getExpenseById,
    editIncome
  }
})
