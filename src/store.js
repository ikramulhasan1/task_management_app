// src/store.js
import { reactive } from 'vue';

export const store = reactive({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],

    addTask(task) {
        this.tasks.push({ name: task, completed: false });
        this.saveTasks();
    },

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
    },

    toggleCompleted(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.saveTasks();
    },

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
});
