<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

require MODELS."articlesModel.php";

class Admin {
  private $authorized = TRUE;
  // private $inactive = 60; // set the session max lifetime to 2 hours
  private $inactive = 7200; // set the session max lifetime to 2 hours

  // do redirect to login page on construct
  function __construct() {
    // set active page
    $_SESSION['activePage'] = 'admin';
  
    if(!isset($_SESSION['isLogged']) || $_SESSION['isLogged'] != TRUE){
      $this->authorized = FALSE;
      http_response_code(401);

      // display unauthorized view
      $pageTitle = 'Unauthorized access';
      include VIEWS . "unauthorized.php";
      $_SESSION['previousPage'] = 'unauthorized'; // set active page as login

      // redirect to login with delay so that user can see the unauthorized page
      header('Refresh: 1; URL='.LVL.'admin/login');
    }
    else {
      // check that it's login time hasn't exceeded limit  
      $this->checkSessionTime();
    }
  }

  function index() {
    if( $this->authorized ){// access page only if authorized
      $pageTitle = 'Admin Page';
      $pageContent = 'adminView.php';
      include VIEWS . "layoutView.php";
    }
  }

  function articles() {
    $articlesModel = new ArticlesModel();
    $result = $articlesModel->getArticles();
    // response should be sent in JSON format
    sendResponseToJSON($result);
  }
  
  function deleteArticles() {
    parse_str(file_get_contents("php://input"), $DELETE);

    $articlesModel = new ArticlesModel();
    $result = $articlesModel->deleteArticles($DELETE['articleIds']);

    sendResponseToJSON(array('deleted' => $result));
  }

  function createArticle() {
    if(!empty($_POST) ){
      var_dump($_POST);
    }
  }

  // check login time and unset session
  private function checkSessionTime() {
    if (isset($_SESSION['adminLoginTime']) && (time() - $_SESSION['adminLoginTime'] > $this->inactive)) {
      // last request was more than the set inactive time
      session_unset();     // unset $_SESSION variable for this page
      session_destroy();   // destroy session data
      session_start();
      session_regenerate_id(true);
      
      $_SESSION['previousPage'] = 'admin'; // set active page as login
      $_SESSION['isLogged'] = FALSE;
      
      // redirect to login with delay so that user can see the unauthorized page
      header('Location: '.LVL.'admin/login');
    }
  }
}
?>