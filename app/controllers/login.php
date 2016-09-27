<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

class Login {
  public $loginWarning;

  function __construct() {
    // set active page as login
    $_SESSION['activePage'] = 'login';
  }

  function index_POST() {
    // header("Content-Type: application/json; charset=utf-8"); // not required because defined in xhr request
    // clean output buffer so the JSON response can be easily distinguished
    ob_clean();

    // send response with error if one input field is empty
    if ( empty($_POST['email']) || empty($_POST['password']) ) {
      // set code for partial content
      http_response_code(206);
      sendResponseToJSON(array('message'=>'Missing data'));
    }
    // proceed with credential check
    elseif ( !empty($_POST['email']) && !empty($_POST['password']) ) {
      require MODELS . "adminLoginModel.php";

      $adminLoginModel = new AdminLoginModel();
      $result = $adminLoginModel->checkCredentials($_POST);

      if( !$result['loginStatus'] ) {
        // forbidden
        http_response_code(403);
        sendResponseToJSON($result);
      }
      else {
        $_SESSION['isLogged'] = TRUE;
        $_SESSION['adminLoginTime'] = time(); // start time count for session
        $_SESSION['previousPage'] = 'login';
        
        http_response_code(200);
        sendResponseToJSON(array('success'=>'Logged in successfully'));
      }
    }
  }
  
  function index_GET() {
    if( $this->adminIsLogged() ) { die(); }
    
    if(isset($_SESSION['previousPage']) && $_SESSION['previousPage'] == 'unauthorized') {
      $this->loginWarning = 'Please authenticate first!';
    }
    elseif(isset($_SESSION['previousPage']) && $_SESSION['previousPage'] == 'admin') {
      $this->loginWarning = 'Session expired! Please login again.';
    } 
    
    $title = "Login Page";
    $pageContent = "loginView.php";
    include VIEWS."layoutView.php";
    $_SESSION['previousPage'] = ''; // set variable as undef, in case or refresh
  }

  function logout() {
    // unset variable so that it's not available anymore for validation
    unset($_SESSION['isLogged']);
    session_unset(); // unset $_SESSION variable for this page
    session_destroy(); // will be done only after refresh, browser render
    // header('Location: '.LVL.'admin/login'); // doesn't work probably because of XHR

    http_response_code(200);
    sendResponseToJSON(array('success'=>'Sign out completed'));
  }

  private function adminIsLogged() {
    if(isset($_SESSION['isLogged']) && $_SESSION['isLogged'] == true) {
      header('Location: '.LVL.'admin');
    }
  }
}

?>
