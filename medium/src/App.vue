<script setup>
import EventCard from '@/components/EventCard.vue'
import BookingItem from '@/components/BookingItem.vue'
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import LoadingBookCard from '@/components/LoadingBookCard.vue'
import { onMounted, ref } from 'vue'

const events = ref([])
const eventsLoading = ref(false)
const books = ref([])
const booksLoading = ref(false)

// fetch events

const fetchEvents = async () => {
  eventsLoading.value = true
  try {
    const res = await fetch('http://localhost:3001/events')
    events.value = await res.json()
    console.log(events.value)
  } finally {
    eventsLoading.value = false
  }
}

const fetchBooks = async () => {
  booksLoading.value = true
  try {
    const res = await fetch('http://localhost:3001/bookings')
    books.value = await res.json()
    console.log(books.value)
  } finally {
    booksLoading.value = false
  }
}

const handleRegister = async (event) => {
  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title
  }

  await fetch('http://localhost:3001/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newBooking,
      status: 'confirmed'
    })
  })
}

onMounted(() => {
  fetchEvents(), fetchBooks()
})
</script>

<template>
  <main class="container mx-auto my-8 space-y-8">
    <h1 class="text-4xl font-medium">Event Booking App</h1>
    <h2 class="text-2xl font-medium">All Events</h2>

    <section class="grid grid-cols-2 gap-8">
      <!-- <EventCard v-for="i in 8" :key="i" /> -->
      <template v-if="!eventsLoading">
        <EventCard
          v-for="event in events"
          :key="event.id"
          :title="event.title"
          :when="event.date"
          :description="event.description"
          @register="handleRegister(event)"
        />
      </template>
      <template v-else>
        <LoadingEventCard v-for="i in 4" :key="i" />
      </template>
    </section>

    <h2 class="text-2xl font-medium">Your Bookings</h2>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!booksLoading">
        <BookingItem v-for="book in books" :key="book.id" />
      </template>
      <template v-else>
        <LoadingBookCard v-for="i in 3" :key="i" />
      </template>
    </section>
  </main>
</template>
