<script>
import { nanoid } from 'nanoid'

import ToDoForm from './components/ToDoForm.vue'
import ToDoItem from './components/ToDoItem.vue'

export default {
  name: 'app',
  components: {
    ToDoForm,
    ToDoItem
  },
  data() {
    return {
      ToDoItems: [
        { id: 'todo-' + nanoid(), label: 'Reading', completed: false },
        { id: 'todo-' + nanoid(), label: 'Walking', completed: true },
        { id: 'todo-' + nanoid(), label: 'Studying', completed: false }
      ]
    }
  },
  methods: {
    addToDo(toDoItem) {
      this.ToDoItems.push({
        id: 'todo-' + nanoid(),
        label: toDoItem,
        completed: false
      })
    },

    updateStatus(id) {
      this.ToDoItems = this.ToDoItems.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed
        }
        return item
      })
    },

    removeToDoItem(id) {
      this.ToDoItems = this.ToDoItems.filter((item) => item.id !== id)
    },

    editToDoItem(toDoId, newLabel) {
      this.ToDoItems = this.ToDoItems.map((item) => {
        if (item.id === toDoId) {
          item.label = newLabel
        }
        return item
      })
    }
  },
  computed: {
    listSummary() {
      const numberFinishedItems = this.ToDoItems.filter((item) => item.completed).length
      return `You have ${this.ToDoItems.length} items in your list. ${numberFinishedItems} are finished.`
    }
  }
}
</script>

<template>
  <div id="app">
    <!-- Header -->
    <h1>ToDo</h1>
    <to-do-form @add-todo="addToDo"></to-do-form>

    <h3 id="list-summary" ref="listSummary" tabindex="-1">{{ listSummary }}</h3>
    <div>
      <ul aria-labelledby="list-summary" class="stack-large">
        <li v-for="item in ToDoItems" :key="item.id">
          <to-do-item
            :label="item.label"
            :completed="item.completed"
            :id="item.id"
            @item-status-updated="updateStatus(item.id)"
            @item-deleted="removeToDoItem(item.id)"
            @item-edited="editToDoItem(item.id, $event)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.btn {
  padding: 6px 12px;
  border: 0.2rem solid #424242;
  cursor: pointer;
  border-radius: 4px;
  text-transform: capitalize;
}
.btn__danger {
  color: #fff;
  background-color: #ba2020;
  border-color: #ba2020;
}
.btn__filter {
  border-color: lightgrey;
}
.btn__danger:focus {
  outline-color: #cb1326;
}
.btn__primary {
  color: #fff;
  background-color: #151515;
}
.btn-group {
  display: flex;
  justify-content: space-between;
}
.btn-group > * {
  flex: 1 1 auto;
}
.btn-group > * + * {
  margin-left: 0.8rem;
}

.label-wrapper {
  margin: 0;
  flex: 0 0 100%;
  text-align: center;
}
[class*='__lg'] {
  display: inline-block;
  width: 100%;

  border-radius: 4px;
}
[class*='__lg']:not(:last-child) {
  margin-bottom: 1rem;
}
@media screen and (min-width: 620px) {
  [class*='__lg'] {
    font-size: 2.2rem;
  }
}
.visually-hidden {
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
}
[class*='stack'] > * {
  margin-top: 0;
  margin-bottom: 0;
}
.stack-small > * + * {
  margin-top: 1.25rem;
}
.stack-large > * + * {
  margin-top: 2.5rem;
}
@media screen and (min-width: 550px) {
  .stack-small > * + * {
    margin-top: 1.4rem;
  }
  .stack-large > * + * {
    margin-top: 2.8rem;
  }
}

#app {
  background: #fff;
  margin: 6rem 0 4rem 0;
  padding: 1rem;
  padding-top: 0;
  position: relative;
}
@media screen and (min-width: 550px) {
  #app {
    padding: 4rem;
  }
}
#app > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
#app > form {
  max-width: 100%;
}
#app h1 {
  display: block;
  min-width: 100%;
  width: 100%;
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
</style>
