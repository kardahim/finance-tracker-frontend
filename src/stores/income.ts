import { defineStore } from 'pinia'
import myAxios from '@/helpers/axios'
import { useAuthStore } from './auth'
import { ref } from 'vue'
import { type Income } from '@/interfaces/income'
import { type IncomeExpense } from '@/interfaces/incomeExpense'
import router from '@/router'

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

  const incomeSources = ref<[{ id: number | null; name: string | null }]>([
    {
      id: null,
      name: null
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

  function deleteIncome(id: number) {
    myAxios
      .delete(`/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        getIncomeList()
      })
      .catch((error) => {
        console.error('Income delete error:', error)
      })
  }

  function getIncomeSources() {
    myAxios
      .get(`/income-source`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        incomeSources.value = response.data
      })
      .catch((error) => {
        console.error('Income sources error:', error)
      })
  }

  function createNewIncome(data: IncomeExpense) {
    data.userId = authStore.user.id

    myAxios
      .post(`/income`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.error('Add income error:', error)
      })
  }

  return { income, incomeSources, getIncomeList, deleteIncome, getIncomeSources, createNewIncome }
})
