<?php
    header('Content-type: text/html; charset=UTF-8') ;
    header('Content-Type: application/json');
    include_once("classStudent.php");     

    $dir    = '../uploads';
    $files = array_diff(scandir($dir, 1), array('.','..'));

    $csv = array_map('str_getcsv', file($dir ."/" . $files[0]));
    $students = [];
    $i = 0;
    foreach ($csv as $unit) {
        if($i != 0) {
            array_push($students, $student = new Student($unit));
        }
        $i++;        
    }
    echo(json_encode($students)); 
?>