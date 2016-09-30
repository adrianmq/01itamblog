<?php
require "db.php";

// Articles class manages all operations on article table
// Extends DB to open and have access to the connection
class ArticlesModel extends DB {
  
  // Get list of all published articles
  function getArticles() {
    $sql = 'select * from articles where active = 1 and deleted = 0';
    $sth = $this->dbh->prepare($sql);
    $sth->execute();
    
    return $sth->fetchAll(PDO::FETCH_ASSOC);    
  }
  
  // Get article by id
  function getArticle($id) {
    $params = [':id' => $id]; 
    $sql = 'select * from articles where id = :id and published = 1';
    $sth = $this->dbh->prepare($sql);
    $sth->execute($params);
    
    return $sth->fetch(PDO::FETCH_ASSOC);      
  }
  
  // Delete article by ids
  function deleteArticles($ids) {
    $idsList = implode(', ',$ids);
    
    $params = [':ids' => $idsList];
    $sql = 'UPDATE articles SET active = 0, deleted = 1 WHERE id IN ('.$idsList.')';
    $sth = $this->dbh->prepare($sql);
    $sth->execute();

    return $sth->rowCount(); 
  }
  
  // Delete article by id
  function deleteArticle($id) {
    $params = [':id' => $id]; 
    $sql = 'UPDATE articles SET published = 0 WHERE id = :id';
    $sth = $this->dbh->prepare($sql);
    $sth->execute($params);
    return $sth->rowCount(); 
  }
  
  // Get list of all published articles
  function getCategories() {
    $sql = 'SELECT category FROM articles GROUP BY category';
    $sth = $this->dbh->prepare($sql);
    $sth->execute();
    
    return $sth->fetchAll(PDO::FETCH_ASSOC);    
  }
  
  // Add new article
  function addArticle($article) {
    $params = [
      ':user_id' => 1, // only one user for the moment
      ':title' => $article["articleTitle"], 
      ':content' => $article["articleContent"], 
      ':category' => $article["categoryName"]
    ]; 
    $sql = 'INSERT INTO articles(user_id, title, content, category) VALUES(:user_id, :title, :content, :category)';
    $sth = $this->dbh->prepare($sql);
    $result = $sth->execute($params);
    return $sth->rowCount();
  }
  
  function updateArticle($article) {
    $params = [
      ':id' => $article['id'],
      ':title' => $article["articleTitle"], 
      ':content' => $article["articleContent"], 
      ':category' => $article["categoryName"]
    ];
    $sql = 'UPDATE articles SET title = :title, content = :content WHERE id = :id';
    $sth = $this->dbh->prepare($sql);
    $sth->execute($params);
    return $sth->rowCount(); 
  }
}