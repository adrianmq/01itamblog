<?php
require MODELS . 'contactModel.php';

class Contact {
  function index(){
    $rsp = '';
    
    if(!empty($_POST) && isset($_POST['submit'])){
      // brief validation for input data
      $input = $this->verifyInput($_POST);
      // check if var is not array
      if(!is_array($input)){
        // save data
        $contactModel = new ContactModel();
        $rsp = $contactModel->saveMessage($_POST) 
          ? 'Message received' 
          : 'Failed to save message';
      }
      else {
        // echo warning message
        foreach ($input as $var) {
          echo ($var . ' required<br>');
        }
      }
    }
    include VIEWS . 'contactView.php';
    echo $rsp;
  }
  
  function verifyInput($inputData){
    $fields = [];
    foreach($inputData as $inputField => $value){
      if(!$value){
        array_push($fields, $inputField);
      }
    }
    
    if($fields){
      return $fields;
    } else {
      return 1;
    }
  }
}
?>