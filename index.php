<?php
  // Display all errors on page
  ini_set(error_reporting, E_ALL);

  require 'app/configs/pages.php';
  require 'app/helpers/functions.php';

  session_start();

  define("BASE_URL", "https://siitamblog-adrianmq.c9users.io/");
  define('VIEWS', 'app/views/'); // constants name with CAPS LOCK
  define('MODELS', 'app/models/'); // constants name with CAPS LOCK
  define('CONTROLLERS', 'app/controllers/'); // constants name with CAPS LOCK
  define('IMG', 'assets/img/');
  define('CSS', 'assets/css/');
  define('JS', 'assets/js/');

  if(!isset($_SERVER['PATH_INFO']) || !$_SERVER['PATH_INFO']){
    $_SERVER['PATH_INFO'] = '/';  
  }
  define('LVL', pathToRoot($_SERVER['PATH_INFO']));

  // verify if array key exists
  if(array_key_exists($_SERVER['PATH_INFO'],$pages)){

    $page = $_SERVER['PATH_INFO'];
    // pass array using reference
    $controller = &$pages[$page];
    // get package
    require CONTROLLERS . $controller['path'];
    // define object
    $obj = new $controller['class']();

    // different methods request dependent ex: index_GET
    $req_dep_method = $controller['method'] . '_' . $_SERVER['REQUEST_METHOD'];
    
    // check if request dependent method exists
    if(method_exists($obj, $req_dep_method)){

      // call request dependent method
      $obj->$req_dep_method();
    }
    // look for basis method
    elseif(method_exists($obj, $controller['method'])){
      
      // call method
      $obj->$controller['method']();
    } 
    else {
      http_response_code(405);
      die('Method '.$controller['method'].' undefined!');
    }
  }
  else {
    echo 'Page not found!';
  }
  
?>