<?php
    $dir    = 'uploads';
    $files = array_diff(scandir($dir, 1), array('.','..'));
    /*
    echo "<pre>";
    print_r($files);
    echo "</pre>";    
    */
    $csv = array_map('str_getcsv', file($files[0]));
    /*
    echo "<pre>";
    print_r($csv);
    echo "</pre>";    
    */
    require_once("classStudent.php");
    $students = [];
    $i = 0;
    foreach ($csv as $unit) {
        if($i != 0) {
            //echo "unit $i " . $unit[0] . "<br>";
            array_push($students, $student = new Student($unit));
        }
        $i++;        
    }
    echo "<pre>";
    print_r($students);
    echo "</pre>";    
?>