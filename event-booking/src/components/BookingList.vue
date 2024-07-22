<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBooks"
      >Could not load events at the moment. Please try again.</ErrorCard
    >
  </template>
  <template v-else>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!loading">
        <template v-if="books.length">
          <BookingItem
            v-for="book in books"
            :key="book.id"
            :status="book.status"
            :title="book.eventTitle"
            @cancelled="cancelBooking(book.id)"
          />
        </template>
        <template v-else>
          <div class="col-span-2 text-center text-gray-500">No booking yet.</div>
        </template>
      </template>
      <template v-else>
        <LoadingBookCard v-for="i in 3" :key="i" />
      </template>
    </section>
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import BookingItem from '@/components/BookingItem.vue'
import ErrorCard from '@/components/ErrorCard.vue'
import useBookings from '@/composables/useBookings'
import LoadingBookCard from './LoadingBookCard.vue'
const { books, loading, fetchBooks, cancelBooking, error } = useBookings()
onMounted(() => {
  fetchBooks()
})
</script>
