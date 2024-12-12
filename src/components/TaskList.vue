<script setup>
import { ref, computed } from 'vue';
import {store} from '../store.js';

const newTask = ref('');
const isFormVisible = ref(false);
const showCompleted = ref(false);

const addTask = () => {
  if (newTask.value.length < 3) {
    alert('Task name must be at least 3 characters long.');
    return;
  }
  store.addTask(newTask.value);
  newTask.value = '';
};

const filteredTasks = computed(() => {
  return showCompleted.value
      ? store.tasks.filter(task => task.completed)
      : store.tasks;
});
</script>


<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-2xl">
    <div class="flex justify-between mb-6">
      <button
          @click="isFormVisible = !isFormVisible"
          class="me-5 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md">
        {{ isFormVisible ? 'Hide Form' : 'Add Task' }}
      </button>
      <button
          @click="showCompleted = !showCompleted"
          class="px-5 py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md">
        {{ showCompleted ? 'Show All' : 'Show Completed' }}
      </button>
    </div>

    <form v-if="isFormVisible" @submit.prevent="addTask" class="flex gap-3 mb-6">
      <input
          type="text"
          v-model="newTask"
          placeholder="Enter a task"
          class="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent shadow-sm text-gray-700" />
      <button
          type="submit"
          class="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-md">
        Add
      </button>
    </form>

    <ul>
      <li
          v-for="(task, index) in filteredTasks"
          :key="index"
          class="flex justify-between items-center mb-3 p-4 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300"
          :class="{'bg-green-50 border-green-500': task.completed}">
        <span :class="{ 'line-through text-gray-400': task.completed }" class="font-medium text-gray-800">
          {{ task.name }}
        </span>
        <div>
          <button
              @click="store.toggleCompleted(index)"
              class="mr-3 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
            ✓
          </button>
          <button
              @click="store.deleteTask(index)"
              class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300">
            X
          </button>
        </div>
      </li>
    </ul>

    <p v-if="!filteredTasks.length" class="text-center text-gray-500 mt-4">No tasks available. Add some to get started!</p>
  </div>
</template>


<style scoped>
</style>
