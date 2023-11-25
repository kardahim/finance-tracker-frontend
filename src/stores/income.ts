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

  const singleIncome = ref<Income>({
    id: null,
    name: null,
    amount: null,
    date: null,
    incomeSource: {
      id: null,
      name: null
    },
    userId: null
  })

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

  async function getIncomeById(id: number) {
    await myAxios
      .get(`/income/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        singleIncome.value.id = response.data.id
        singleIncome.value.name = response.data.name
        singleIncome.value.amount = response.data.amount
        singleIncome.value.date = response.data.date
        singleIncome.value.incomeSource.id = response.data.incomeSource.id
        singleIncome.value.incomeSource.name = response.data.incomeSource.name
        singleIncome.value.userId = response.data.user.id
      })
      .catch((error) => {
        console.error('Income get by id error:', error)
      })
  }

  function editIncome(id: number, data: IncomeExpense) {
    data.userId = authStore.user.id

    myAxios
      .put(`/income/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        router.push('/')
      })
      .catch((error) => {
        console.error('Edit income error:', error)
      })
  }

  return {
    income,
    singleIncome,
    incomeSources,
    getIncomeList,
    editIncome,
    deleteIncome,
    getIncomeSources,
    createNewIncome,
    getIncomeById
  }
})
