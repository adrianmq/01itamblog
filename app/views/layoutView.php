<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css" integrity="sha384-MIwDKRSSImVFAZCVLtU0LMDdON6KVCrZHyVQQj6e8wIEJkW4tvwqXrbMIya1vriY" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>style.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>adminLoginPage.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>adminArticlesPage.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>adminAddArticle.css" type="text/css" />
    <title>a-blog</title>
</head>
<body>
    <div class="container">
        <?php if(!empty($this->loginWarning)){ echo '<span style="font-size:75%; margin-top:1px; float:right; color:red;">'.$this->loginWarning.'</span>'; }; ?>
        <?php include "menuView.php"; ?>
        <?php include $pageContent;?>
    </div>

    <script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>fixtures.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>helpers.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>adminlogin.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>admin.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>articleslist.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>main.js"></script>
</body>
</html>
