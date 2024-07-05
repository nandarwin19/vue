<script>
export default {
  methods: {
    onSubmit() {
      if (this.label === '') {
        return
      }
      this.$emit('add-todo', this.label)
      this.label = ''
    }
  },
  data() {
    return {
      label: ''
    }
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2>
      <label for="new-todo-input" class="label__lg">Add your todo item</label>
    </h2>
    <input
      type="text"
      id="new-todo-item"
      name="new-todo"
      autocomplete="off"
      v-model.lazy.trim="label"
      class="input__lg"
    />
    <button type="submit" class="btn btn__primary btn__lg">Add</button>
  </form>
</template>
