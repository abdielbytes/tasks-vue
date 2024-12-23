const TaskInput = {
    template: `
      <div>
        <input v-model="newTask" placeholder="Enter a new task" />
        <button @click="addTask">Add Task</button>
      </div>
    `,
    data() {
      return {
        newTask: '',
      };
    },
    methods: {
      addTask() {
        if (this.newTask.trim()) {
          this.$emit('task-added', this.newTask.trim());
          this.newTask = '';
        }
      },
    },
  };
  
  // TaskCard Component
  const TaskCard = {
    props: {
      task: {
        type: Object,
        required: true,
      },
    },
    template: `
      <div :class="{ completed: task.completed }" class="task-card">
        <p>{{ task.text }}</p>
        <button @click="$emit('toggle-task', task.id)">
          {{ task.completed ? 'Undo' : 'Complete' }}
        </button>
        <button @click="$emit('delete-task', task.id)">Delete</button>
      </div>
    `,
  };
  
  // TaskList Component
  const TaskList = {
    props: {
      tasks: {
        type: Array,
        required: true,
      },
    },
    template: `
      <div>
        <task-card
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-task="$emit('toggle-task', $event)"
          @delete-task="$emit('delete-task', $event)"
        ></task-card>
      </div>
    `,
    components: {
      TaskCard,
    },
  };
  
  // TaskManager Component (Parent Component)
  const TaskManager = {
    template: `
      <div>
        <h1>Task Manager</h1>
        <task-input @task-added="addTask"></task-input>
        <task-list
          :tasks="tasks"
          @toggle-task="toggleTask"
          @delete-task="deleteTask"
        ></task-list>
      </div>
    `,
    data() {
      return {
        tasks: [],
      };
    },
    methods: {
      addTask(taskText) {
        this.tasks.push({
          id: Date.now(),
          text: taskText,
          completed: false,
        });
      },
      toggleTask(taskId) {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) task.completed = !task.completed;
      },
      deleteTask(taskId) {
        this.tasks = this.tasks.filter((t) => t.id !== taskId);
      },
    },
    components: {
      TaskInput,
      TaskList,
    },
  };
  
  // Create Vue App
  Vue.createApp({
    components: {
      TaskManager,
    },
  }).mount('#app');
  