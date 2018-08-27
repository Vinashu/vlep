<?php
    header('Content-type: text/html; charset=UTF-8') ;
    header('Content-Type: application/json');
    include_once("classStudent.php");     
    $file = $_GET["file"];
    $dir    = '../uploads';
    $csv = array_map('str_getcsv', file($dir ."/" . $file));
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