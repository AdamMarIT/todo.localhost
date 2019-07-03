let vm = new Vue({
  el: '#toDoList',
  data: {
    taskBody : "",
    saveMessage: false,
    activeColor: '#52c7b8',
    tasks: []
  },

  created: function () {
    if (localStorage.tasks) {
      this.tasks = JSON.parse(localStorage.tasks);
    }
    setInterval(() => this.saveToLocalStorage(), 5000);
  },

  methods: {
    addTask: function(e) {
      this.tasks.push({
        body : this.taskBody,
        color: this.activeColor,
      })

      this.taskBody = '';
    },
    deleteTask(index) {
       this.tasks.splice(index, 1); 
    },
    
    async save() {
      await fetch('/save.php', {
        method: 'POST',
        body: JSON.stringify(this.tasks)
      });
      this.saveMessage = true;
      setTimeout(() => this.saveMessage = false, 2000);
    },

    async load() {
      const response = await fetch('/load.php');
      const json =  await response.json();

      for (let task of json){
        this.tasks.push({
          body: task['body'],
          color: task['color'],
        });
      }
    },
    saveToLocalStorage() {
      let serialTasks = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", serialTasks);
    },
    
    changePriority(color, index) {
      let tBody = this.tasks[index].body;

      if (color === '#52c7b8') {
        Vue.set(this.tasks, index, {
          body: tBody,
          color: 'orange',
        });    
      }
      if (color === 'orange') {
        Vue.set(this.tasks, index, {
          body: tBody,
          color: 'red',
        });
      }
      if (color === 'red') {
        Vue.set(this.tasks, index, {
          body: tBody,
          color: '#52c7b8',
        });
      }
    }
  } 
});


