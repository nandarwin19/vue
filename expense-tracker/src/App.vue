<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />
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

import { ref } from 'vue'
import { nanoid } from 'nanoid'

import { useToast } from 'vue-toast-notification'

const toast = useToast()
const transactions = ref([])

const deleteTransaction = (id) => {
  console.log(transactions)
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  toast.success('Transaction deleted!')
}

const handleAddTransaction = (transitionData) => {
  transactions.value.push({
    id: nanoid(),
    text: transitionData.text,
    amount: transitionData.amount
  })

  // console.log(transitionData)

  toast.success('Transaction added successfully')
}
</script>
