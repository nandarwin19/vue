<template>
  <Header />
  <div class="container">
    <Balance :total="total" />
    <IncomeExpenses :income="+income" :expenses="-expenses" />
    <TransactionList :transactions="transactions" @deleteTransaction="deleteTransaction" />
    <AddTransaction @addTransaction="handleAddTransaction" />
  </div>
</template>

<script setup>
import Header from '@/components/HeaderComponent.vue'
import Balance from '@/components/BalanceComponent.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransaction from '@/components/AddTransaction.vue'

import { computed, onMounted, ref } from 'vue'
import { nanoid } from 'nanoid'

import { useToast } from 'vue-toast-notification'

const toast = useToast()
const transactions = ref([])

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))

  if (savedTransactions) {
    transactions.value = savedTransactions
  }
})

const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2)
})

const deleteTransaction = (id) => {
  console.log(transactions)
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)

  savedTransactionsToLocalStorage()
  toast.success('Transaction deleted!')
}

const handleAddTransaction = (transitionData) => {
  transactions.value.push({
    id: nanoid(),
    text: transitionData.text,
    amount: transitionData.amount
  })

  savedTransactionsToLocalStorage()

  // console.log(transitionData)

  toast.success('Transaction added successfully')
}

const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
})

const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)
    .toFixed(2)
})

// Save data to local storage
const savedTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
