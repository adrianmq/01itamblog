<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');  

class Login {
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
        
        http_response_code(200);
        sendResponseToJSON(array('success'=>'Logged in successfully'));
      }
    }
  }
  
  function index_GET() {
    $this->adminIsLogged();
    
    if(isset($_SESSION['activePage']) && $_SESSION['activePage'] != 'login') {
        echo '<pre style="margin-top:0px; float:right; color:red;">Please authenticate first! </pre>'; 
    } 
    $title = "Login Page";
    $pageContent = "loginView.php";
    include VIEWS."layoutView.php";

    $_SESSION['activePage'] = 'login'; // set active page as login
  }

  function logout() {
    // unset variable so that it's not available anymore for validation
    unset($_SESSION['isLogged']);
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
