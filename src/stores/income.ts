import { defineStore } from 'pinia'
import myAxios from '@/helpers/axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'
import { type Income } from '@/interfaces/income'

export const useIncomeStore = defineStore('income', () => {
  const authStore = useAuthStore()
  const token = authStore.user.refreshToken

  const income = ref<[Income]>([
    {
      id: null,
      name: null,
      amount: null,
      date: null,
      incomeSource: {
        id: null,
        name: null
      },
      userId: null
    }
  ])

  function getIncomeList() {
    myAxios
      .get(`/income/user/${authStore.user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const newRecords: [Income] = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          amount: item.amount,
          date: item.date,
          incomeSource: {
            id: item.incomeSource.id,
            name: item.incomeSource.name
          },
          userId: item.user.id
        }))

        income.value = newRecords
      })
      .catch((error) => {
        console.error('Income list error:', error)
      })
  }

  return { income, getIncomeList }
})
