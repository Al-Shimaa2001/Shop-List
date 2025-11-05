<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
const header = ref('Shop list')
interface ShoppingItem {
  id: number
  priority: string
  item: string
  done: boolean
}
const newItem = ref('')
const newPriority = ref('')
const shoppingList = ref<ShoppingItem[]>([])
const lengthOfItem = computed(() => shoppingList.value.length)

onMounted(() => {
  const saveItem = localStorage.getItem('shoppingItems')
  if (saveItem) {
    shoppingList.value = JSON.parse(saveItem)
  }
})

const saveItems = () => {
  if (shoppingList.value) {
    shoppingList.value.push({
      id: shoppingList.value.length + 1,
      priority: newPriority.value,
      item: newItem.value,
      done: false,
    })
    saveInLocalStorage()
    newItem.value = ''
    newPriority.value = ''
  }
}
const saveInLocalStorage = () => {
  localStorage.setItem('shoppingItems', JSON.stringify(shoppingList.value))
}
const deleteAllItems = () => {
  if (shoppingList.value) {
    shoppingList.value = []
    saveInLocalStorage()
  }
}
const doneTask = (item: ShoppingItem & { done?: boolean }) => {
  item.done = !item.done
  saveInLocalStorage()
}
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

    <div class="itemsNumber">
      <span>{{ lengthOfItem }} \100</span>
      <button class="addBtn" @click="deleteAllItems()">Delete all</button>
    </div>

    <ul>
      <li
        v-for="item in shoppingList"
        :key="item.id"
        :class="{ high: item.priority == 'high', low: item.priority == 'low', doneTask: item.done }"
      >
        <span> {{ item.item }}</span>
       
        <button class="addBtn" @click="doneTask(item)">Done</button>
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
.itemsNumber {
  font-weight: 800;
  font-size: 2em;
  display: flex;
  justify-content: center;
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
.doneTask {
  text-decoration: line-through;
  background-color: gray !important;
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
  margin: 0 10px;
}
.addBtn:hover {
  transform: scale(0.9);
  cursor: pointer;
  background-color: black;
  color: wheat;
}
p {
  color: red;
  font-size: 2.5em;
  font-weight: bolder;
  text-align: center;
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
