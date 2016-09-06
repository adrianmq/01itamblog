<?php
require MODELS."articlesModel.php";

// echoPre($_SESSION); //TOREMOVE

class Admin {
  private $authorized = TRUE;
  
  // do redirect to login page on construct
  function __construct() {
    $_SESSION['activePage'] = 'admin';
    // $_SESSION['isLogged'] = FALSE; //TOREMOVE

    if(!isset($_SESSION['isLogged']) || $_SESSION['isLogged'] != TRUE){
      $this->authorized = FALSE;
      http_response_code(401);

      // display unauthorized view
      $pageTitle = 'Unauthorized access';
      include VIEWS . "unauthorized.php";

      // redirect to login with delay so that user can see the unauthorized page
      header('Refresh: 1; URL='.LVL.'admin/login');
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
  
  function deleteArticle() {
    parse_str(file_get_contents("php://input"), $DELETE);
    
    $articlesModel = new ArticlesModel();
    $result = $articlesModel->deleteArticle($DELETE["id"]);

    sendResponseToJSON(array('deleted' => $result));
  }
  
}
?>