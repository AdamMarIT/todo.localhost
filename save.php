<?php

	$json = file_get_contents('php://input');
		
	$file = 'tasks.txt';
    file_put_contents($file, $json);

