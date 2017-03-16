<?php 
$uploaddir = "/tmp/phpupload/";
foreach($_FILES as $file)
{ 
    $uploadfile = $uploaddir . basename( $file['name']);
    if(!move_uploaded_file($file['tmp_name'], $uploadfile))
    {
        echo "There was an error uploading the file";
        http_response_code(111);
        exit; 
    }
}
  http_response_code(200);
?> 

