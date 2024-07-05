<template>
  <Header />
  <div class="container">
    <Balance />
    <IncomeExpenses />
    <TransactionList :transitions="transitions" @transactionDeleted="deleteTransaction" />
    <AddTransaction />
  </div>
</template>

<script setup>
import Header from '@/components/HeaderComponent.vue'
import Balance from '@/components/BalanceComponent.vue'
import IncomeExpenses from '@/components/IncomeExpenses.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransaction from '@/components/AddTransaction.vue'

import { ref } from 'vue'

const transactions = ref([])


const deleteTransaction = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
}


</script>
