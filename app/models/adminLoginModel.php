<?php
require 'db.php';

class AdminLoginModel extends DB {
  // check admin credentials
  public function checkCredentials( $formData ) {

    $sql = 'SELECT * FROM admin WHERE email = \''.$formData['email'].'\';';
    $sth = $this->dbh->prepare($sql);
    $sth->execute();

    $adminData = $sth->fetch(PDO::FETCH_ASSOC);

    if(!$adminData) {
      return [
        'loginStatus' => -1,
        'message'     => 'Invalid email address provided!'
      ];
    }
    else {
      $dbPassword = $adminData['password'];
      
      if( $formData['password'] != $dbPassword ) {
        return [
          'loginStatus' => 0,
          'message'     => 'Invalid password provided!'
        ];
      }
      else {
        return [
          'loginStatus' => 1,
          'message'     => 'Logged in as admin!'
        ];
      }
    }
  }
}
?>