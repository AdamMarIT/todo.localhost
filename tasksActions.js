class Task {

  constructor(taskBody,  isloaded) {
    this.taskBody = taskBody;
    this.isloaded = isloaded;
    this.key = Math.random().toString(36).substring(2, 15);
  }

  getHtml() {
    let stringHtml = `
      <div class="row item inline" data-item="${this.key}">
        <div class="col-sm-8">
          ${this.taskBody}&nbsp;${this.isloaded}
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
    this.storage[task.key] = task.taskBody;
  }

  remove(taskKey) {
    delete this.storage[taskKey];
  }

  getJson(){
    return JSON.stringify(this.storage);
  }
}

$(document).ready(function () { 
  const storage = new Storage();
		  
  $('#add-button').click(function () { 
    let taskBody = $('#new-item').val(); 
    addTask(taskBody, '');

    $('#new-item').val('');				     
  });

  $('#list').on("click", '.delete-button', function () { 
    let randomThis = $(this).attr('data-item');
    storage.remove(randomThis);

    $(`.item[data-item="${randomThis}"]`).remove(); 
    return false;
  });

  $('#save-button').click(function () {
    let tasksStr = storage.getJson();

    $.ajax('/save.php', {
  	  type: 'POST',  
  	  data: {tasksName : tasksStr}, 
  	  success: function (data, status, xhr) {
  	    $('#success').append(`
  	      <div class="bg-blue">saved to file</div>`
  	    )
  	  },
  	  error: function (jqXhr, textStatus, errorMessage) {
  	  }
  	});
  });

  $('#load-button').click(function () {
    $.ajax('/load.php', {    
    	success: function (data, status, xhr) {
    	  let storageLoaded = JSON.parse(data); 
    	  for (let key in storageLoaded) { 
    	    addTask(storageLoaded[key], '(loaded)');
    	  }
    	},
    	error: function (jqXhr, textStatus, errorMessage) {
    	}
    });
  });

  function addTask(taskBody, isloaded) {
    const task = new Task(taskBody, isloaded); 				  
    $('#list').append(task.getHtml());
    storage.add(task)
  }

});