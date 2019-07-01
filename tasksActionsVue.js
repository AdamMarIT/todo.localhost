var toDoList = {
  taskBody : "",
  saveMessage: false,

  tasks: []
};

var vm = new Vue({
  el: '#toDoList',
  data: toDoList,

  methods: {
    addTask: function(e) {
      this.tasks.push({body : this.taskBody}) 
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
      this.saveMessage = await true;
      setTimeout(() => this.saveMessage = false, 2000);
    },

    async load() {
      const response = await fetch('/load.php');
      const json =  await response.json();

      for (let key in json){
        this.tasks.push({
          body: json[key]['body']
        });
      }
    }
  } 
})