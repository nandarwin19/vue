import { ref } from 'vue'

const books = ref([])
const loading = ref(false)
const error = ref(null)

const fetchBooks = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('http://localhost:3001/bookings')
    books.value = await res.json()
    // console.log(books.value)
  } catch (e) {
    error.value = e
  } finally {
    loading.value = false
  }
}

const findBookingById = (id) => books.value.findIndex((b) => b.id === id)

const handleRegister = async (event) => {
  if (books.value.find((book) => book.eventId === event.id))
    return alert('You have already registered for this event')

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventId: event.id,
    eventTitle: event.title,
    status: 'pending'
  }

  books.value.push(newBooking)

  try {
    const res = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed'
      })
    })

    if (res.ok) {
      const index = findBookingById(newBooking.id)
      books.value[index] = await res.json()
    } else {
      throw new Error('Failed to confirm booking')
    }
  } catch (error) {
    console.error(`Failed to register for event: `, error)
    books.value = books.value.filter((book) => book.eventId !== newBooking.eventId)
  }
}

const cancelBooking = async (bookingId) => {
  const index = findBookingById(bookingId)
  const originalBooking = books.value[index]
  books.value.splice(index, 1)

  try {
    const res = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      throw new Error('Booking could not be cancelled.')
    }
  } catch (e) {
    console.error('Failed to cancel booking', e)
    books.value.splice(index, 0, originalBooking)
  }
}

export default function useBookings() {
  return {
    books,
    loading,
    error,
    fetchBooks,
    cancelBooking,
    handleRegister
  }
}
