<?php

	if ($_POST["tasksName"]){
		$file = 'tasks.txt';
        
        file_put_contents($file, $_POST["tasksName"]);
	}
