<?php 
    $error = false;
    $fileName = false;
    function upload($index,$destination,$maxsize=FALSE,$extensions=FALSE) {
        //Test1: file uploaded
        if (!isset($_FILES[$index]) OR $_FILES[$index]['error'] > 0)
        return FALSE;
        //Test2: size limit
        if ($maxsize !== FALSE AND $_FILES[$index]['size'] > $maxsize)
        return FALSE;
        //Test3: extension
        $ext = substr(strrchr($_FILES[$index]['name'],'.'),1);
        if ($extensions !== FALSE AND !in_array($ext,$extensions))
        return FALSE;
        //Déplacement
        return
        move_uploaded_file($_FILES[$index]['tmp_name'],$destination. '/'.basename($_FILES[$index]['name']));
    }
    $upload = upload('uploadFile','uploads/',143099,['csv']);
    if($upload){ 
        $error = true;
        $fileName = $_FILES['uploadFile']['name'];
    } else { 
        return $error = false;
    }
?>

<script>
    window.top.window.uploadEnd("<?= $error ?>","<?= $fileName ?>");
</script>
