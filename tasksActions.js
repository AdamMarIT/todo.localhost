class Task {

  constructor(body,  isloaded) {
    this.body = body;
    this.isloaded = isloaded;
    this.key = Math.random().toString(36).substring(2, 15);
  }

  getHtml() {
    let stringHtml = `
      <div class="row item inline" data-item="${this.key}">
        <div class="col-sm-8">
          ${this.body}&nbsp;${this.isloaded}
        </div>
        <div class="col-sm-2">
          <div class="btn btn-sm btn-danger delete-button button-inline" data-item="${this.key}">
            Delete
          </div>
        </div>
      </div>`
    return stringHtml;
  }
}

class Storage {

  constructor() {
    this.storage = {};
  }

  add(task) {
    this.storage[task.key] = task.body;
  }

  remove(taskKey) {
    delete this.storage[taskKey];
  }

  getJson(){
    return JSON.stringify(this.storage);
  }
}

class SaveManager {

  constructor() {
  }

  setStorage(storage) {
    this.storage = storage
  }

  save() {
    let tasksStr = this.storage.getJson();

    $.ajax('/save.php', {
      type: 'POST',  
      data: {tasks : tasksStr}, 
      success: function (data, status, xhr) {
        $('#success').show("slow");
        setTimeout(function() { 
          $('#success').hide();
        }, 3000);
      },
    });
  }

  load() { 

    $.ajax('/load.php', {    
      success: (data, status, xhr) => {
        let tasksLoaded = JSON.parse(data); 
        for (let key in tasksLoaded) { 
          this.addTask(tasksLoaded[key], '(loaded)');
        }
      },
      error: (jqXhr, textStatus, errorMessage) => {
        this.addTask('you have no tasks', '');
      }
    });
  }

  addTask(taskBody, isloaded) {
    const task = new Task(taskBody, isloaded);          
    $('#list').append(task.getHtml());
    this.storage.add(task)
  }

}

$(document).ready(function () { 
  const storage = new Storage();	  
  const saveManager = new SaveManager();
  saveManager.setStorage(storage);

  $('#add-button').click(function () { 
    let taskBody = $('#new-item').val(); 
    saveManager.addTask(taskBody, '');

    $('#new-item').val('');				     
  });

  $('#list').on("click", '.delete-button', function () { 
    let randomThis = $(this).attr('data-item');
    storage.remove(randomThis);

    $(`.item[data-item="${randomThis}"]`).remove(); 
  });

  $('#save-button').click(function () {
    saveManager.save();
  });

  $('#load-button').click(function () {
    saveManager.load();
  });

});