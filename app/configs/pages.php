<?php
$pages = array( 
  "/" => array( "path" => "home.php", "class" => "Home", "method" => "index" ),
  "/home" => array( "path" => "home.php", "class" => "Home", "method" => "index" ),
  "/articles" => array( "path" => "articles.php", "class" => "Articles", "method" => "index" ),
  "/contact" => array( "path" => "contact.php", "class" => "Contact", "method" => "index" ),
  "/admin/login" => array( "path" => "login.php", "class" => "Login", "method" => "index" ),
  "/admin/logout" => array( "path" => "login.php", "class" => "Login", "method" => "logout" ),
  "/admin" => array( "path" => "admin.php", "class" => "Admin", "method" => "index" ),
  "/admin/articles" => array( "path" => "admin.php", "class" => "Admin", "method" => "articles" ),
  "/admin/articles/delete" => array( "path" => "admin.php", "class" => "Admin", "method" => "deleteArticles")
);