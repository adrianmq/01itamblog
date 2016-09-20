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

// check login time and unset session
function checkSessionTime() {
  if (isset($_SESSION['adminLoginTime']) && (time() - $_SESSION['adminLoginTime'] > $inactive)) {
      // last request was more than the set inactive time
      session_unset();     // unset $_SESSION variable for this page
      session_destroy();   // destroy session data
  }
}

// attempt to send response data
function jsonResponse($code = 200, $message) {
  // clean output buffer so the JSON response can be easily distinguished
  ob_clean();
  // clear the old headers
  header_remove();
  // set the actual code
  http_response_code($code);
  // set the header to make sure cache is forced
  header("Cache-Control: no-transform, public, max-age=300, s-maxage=900");
  // treat this as json
  header('Content-Type: application/json');
  // ok, validation error, or failure
  header('Status: '.$status[$code]);

  $status = array(
    200 => '200 OK',
    206 => '206 Partial Content',
    400 => '400 Bad Request',
    401 => '401 Unauthorized',
    403 => '403 Forbidden',
    405 => '405 Method not allowed',
    500 => '500 Internal Server Error'
    );

  if( !$message ) { $message = $status[$code]; }

  // return the encoded json
  try {
    $res = json_encode(array(
      'status' => $code,
      'message'=> $message
      ));
  } catch(Exception $e) {
    $res = json_encode(array("error"=>"Invalid response")); 
  }
  return $res;
}
