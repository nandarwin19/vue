<template>
  <section class="grid grid-cols-2 gap-8">
    <!-- <EventCard v-for="i in 8" :key="i" /> -->
    <template v-if="!loading">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :title="event.title"
        :when="event.date"
        :description="event.description"
        @register="$emit('register', event)"
      />
    </template>
    <template v-else>
      <LoadingEventCard v-for="i in 4" :key="i" />
    </template>
  </section>
</template>

<script setup>
import LoadingEventCard from '@/components/LoadingEventCard.vue'
import EventCard from '@/components/EventCard.vue'
import { onMounted, ref } from 'vue'

defineEmits(['register'])

const events = ref([])
const loading = ref(false)

// fetch events

const fetchEvents = async () => {
  loading.value = true
  try {
    const res = await fetch('http://localhost:3001/events')
    events.value = await res.json()
    // console.log(events.value)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchEvents())
</script>
