<?php 
require MODELS . 'articlesModel.php';

class Articles {
  function index(){
    $articlesModel = new ArticlesModel();
    $articles = $articlesModel->getArticles();
    // print_r($articles);
    $pageTitle = 'Articles Page';
    $pageContent = 'articlesView.php';
    include VIEWS . "layoutView.php";
  }
}

?>