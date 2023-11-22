import { defineStore } from 'pinia'
import myAxios from '@/helpers/axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'
import { type Expense } from '@/interfaces/expense'

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

  return { expenses, getExpenseList }
})
