<?php

	if ($_POST["tasks"]){
		$file = 'tasks.txt';
        file_put_contents($file, $_POST["tasks"]);
	}
