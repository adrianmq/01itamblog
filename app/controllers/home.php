<?php
class Home {
  function index(){
    // header('Location: '.LVL.'admin');
    $date = date('d/m/Y');
    $pageTitle = 'Home Page';
    $pageContent = 'homeView.php';
    include VIEWS . "layoutView.php";
    return 1;
  }
}
?>