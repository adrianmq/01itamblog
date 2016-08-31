<?php
function echoPre($string){
  echo '<pre>';
  print_r($string);
  echo '</pre>';
}

// return string representing the number of subfolders
// to search backwards for reaching root
// ex: $path = '/home/users/admin' $pathToRoot = '../../'
function pathToRoot($path){
  $pathToRoot = '';
  // remove first slash /
  $pathT = preg_replace('/^\//', '', $path);
  // split array on slash
  $dirs = explode('/', $pathT);

  $i = 1; // default - ignore first elem | root level
  while($i < count($dirs)){
    $pathToRoot .= '../';
    $i++;
  }
  return $pathToRoot;
}

// attempt to send response data
function sendResponseToJSON($response) {
  try {
     $res = json_encode($response);
  } catch(Exception $e) {
     $res = json_encode(array("error"=>"Invalid response")); 
  }
  die($res);
}
