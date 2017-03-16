<?php 
echo "tst";
$uploaddir = "./upload_panos/";
$flist = $_FILES["uploadedfile"];
$i = 0;
foreach($flist["name"] as $filename)
{   
    //ob_start();
    //var_dump($_FILES); 
    //$tstlog = ob_get_clean();
    //error_log($tstlog);
    $uploadfile = $uploaddir . basename($filename);
    if(!move_uploaded_file($flist['tmp_name'][$i], $uploadfile))
    {
        echo "There was an error uploading the file";
        http_response_code(111);
        exit; 
    }
    $i = $i +1;
}
  system("python /var/www/html/panora/parse.py");
  http_response_code(200);
?> 

