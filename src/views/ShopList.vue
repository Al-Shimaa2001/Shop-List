<script setup lang="ts">
import { ref } from 'vue'
const header = ref('Shop list')
const shoppingList = ref([
  { id: 1, priority: 'high', item: 'apple' },
  // { id: 2, priority: 'low', item: 'orange' },
  // { id: 3, priority: 'high', item: 'milk' },
  // { id: 4, priority: 'low', item: 'coff' },
  // { id: 5, priority: 'low', item: 'juice' },
  // { id: 6, priority: 'high', item: 'read' },
])

const newItem = ref('')
const newPriority = ref('')
const saveItems = () => {
  shoppingList.value.push({
    id: shoppingList.value.length + 1,
    priority: newPriority.value,
    item: newItem.value,
  })
  newItem.value = ''
}
const done = ref(false)
</script>

<template>
  <main class="main">
    <h1>{{ header }}</h1>
    <form class="add-item-form" @submit.prevent="saveItems">
      <section class="addItem">
        <input
          type="text"
          class="inputText"
          v-model="newItem"
          placeholder="Enter the  item >> EX: books"
        />
      </section>
      <section class="priority">
        priority :
        <label for="heigh">
          <input id="heigh" type="radio" v-model="newPriority" value="high" /> high
        </label>
        <label for="low">
          <input id="low" type="radio" v-model="newPriority" value="low" /> low
        </label>
      </section>
      <section>
        <button class="addBtn">save Items</button>
      </section>
    </form>
    <ul>
      <li
        :class="priority == 'high' ? 'high' : 'low'"
        v-for="{ id, priority, item } in shoppingList"
        :key="id"
      >
        {{ item }}
      </li>
    </ul>
    <p v-if="!shoppingList.length">No thing add yet</p>
  </main>
</template>
<style lang="css" scoped>
main {
  font-family: sans-serif;
  text-transform: capitalize;
}
h1 {
  text-align: center;
  background-color: rgb(152, 205, 252);
  padding: 1em;
  margin: auto;
  width: fit-content;
  border-radius: 21px;
  box-shadow: 2px 5px 5px rgb(187, 187, 252);
  animation: header 1s ease-in-out;
}
section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5% 0;
}
.inputText,
.priority {
  background-color: white;
  margin: auto;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  width: 70%;
  box-shadow: 2px 5px 5px gray;
}
li {
  list-style: none;
  padding: 0.9em;
  border-radius: 10px;
  width: 90%;
  box-shadow: 2px 5px 5px rgb(226, 226, 226);
  animation: listItems 2s 0.5s alternate;
  margin: 2% 0;
  display: flex;
  justify-content: space-between;
}
.high {
  background-color: rgb(247, 183, 183);
}
.low {
  background-color: rgb(252, 243, 243);
}

.addBtn {
  background-color: wheat;
  padding: 0.6em;
  border-radius: 5px;
  border: none;
  box-shadow: 2px 3px 4px rgb(199, 199, 199);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1.3px;
  transition: all 0.5s ease-in-out;
}
.addBtn:hover {
  transform: scale(0.9);
  cursor: pointer;
  background-color: black;
  color: wheat;
}
p {
  color: red;
  font-size: 20px;
}

/*  animation  */
@keyframes header {
  0% {
    padding: 0;
  }
  50% {
    padding: 0.5em;
  }
  75% {
    padding: 0.7em;
  }
  100% {
    padding: 1em;
  }
}
@keyframes listItems {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
