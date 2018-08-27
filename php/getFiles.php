<?php
    header('Content-type: text/html; charset=UTF-8') ;
    header('Content-Type: application/json');

    $dir    = '../uploads';
    $files = array_diff(scandir($dir, 1), array('.','..'));

    echo(json_encode($files)); 
?>