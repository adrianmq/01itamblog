<?php
require 'db.php';

class ContactModel extends DB {
  // Add form data
  function saveMessage($formData){
    $params = [
      ':firstName' => $formData['firstName'],
      ':email'     => $formData['email'],
      ':message'   => $formData['message']
    ];
    $sql = 'INSERT INTO contact(first_name, email, message) VALUES(:firstName, :email, :message)';
    $sth = $this->dbh->prepare($sql);
    $sth->execute($params);
    return $sth->rowCount();
    // return 1;
  }
}
?>