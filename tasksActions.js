$(document).ready(function () {
  let storage = {};
		  
  $('#add-button').click(function () { 
    let value = $('#new-item').val(); 
    let addTasks = addTask(value, '');

    $('#new-item').val('');				     
  });

  $('#list').on("click", '.delete-button', function () { 
    let randomThis = $(this).attr('data-item');
    delete storage[randomThis];

    $(`.item[data-item="${randomThis}"]`).remove(); 
    return false;
  });

  $('#save-button').click(function () {
    let tasksStr = JSON.stringify(storage);

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
	    let addTasks = addTask(storageLoaded[key], '(loaded)');
	  }
	},
	error: function (jqXhr, textStatus, errorMessage) {
	}
  });
});

  function addTask(value, isloaded) {
    let random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    random = random.trim();
  				  
    $('#list').append(`
      <div class="row item inline" data-item="${random}">
        <div class="col-sm-8">
          ${value}&nbsp;${isloaded}
        </div>
  	  <div class="col-sm-2">
  	    <div class="btn btn-sm btn-danger delete-button button-inline" data-item="${random}">
  	      Delete
  	    </div>
        </div>
      </div>`
     )
     storage[random] = value;	
  }
});