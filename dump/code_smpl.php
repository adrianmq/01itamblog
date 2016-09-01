<?php
// create an empty html file
$filename = 'test.html';        
header("Cache-Control: public");
header("Content-Description: File Transfer");       
header("Content-Disposition: attachment; filename=$filename");
header("Content-Type: application/octet-stream; ");
header("Content-Transfer-Encoding: binary");
exit();