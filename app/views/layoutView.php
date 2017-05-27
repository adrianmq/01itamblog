<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.3/css/bootstrap.min.css" integrity="sha384-MIwDKRSSImVFAZCVLtU0LMDdON6KVCrZHyVQQj6e8wIEJkW4tvwqXrbMIya1vriY" crossorigin="anonymous">-->
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>main.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>header.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>footer.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>common.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>about.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>adminLoginPage.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>adminArticlesPage.css" type="text/css" />
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>adminAddArticle.css" type="text/css" />
    <title>a-blog</title>
</head>
<body>
    <div class="main-wrapper">
        <header id="header">
            <?php if(!empty($this->loginWarning)){ echo '<span style="font-size:75%; margin-top:1px; float:right; color:red;">'.$this->loginWarning.'</span>'; }; ?>
            <?php include "menuView.php"; ?>
        </header>
        <section class="page-content">
            <?php include $pageContent;?>
        </section>
        <footer>
            <div>
                <ul class="footer-refs">
                    <li>
                        <a id="github-icon" title="AM Github profile" href="https://github.com/" target="_blank"></a>
                    </li>
                    <li>
                        <a id="linkedin-icon" title="AM LinkedIn profile" href="https://www.linkedin.com/" target="_blank"></a>
                    </li>
                </ul>
                <div class="copy-right">
                    <p>
                        © 2016-2017 Adrian Matei
                        <br>
                        Code: 
                        <a href="http://opensource.org/licenses/MIT">The MIT License (MIT)</a>
                    </p>  
                </div>
            </div>
        </footer>
    </div>

    <script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>fixtures.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>helpers.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>adminlogin.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>admin.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>articleslist.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>main.js"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>hshQuery/index.js"></script>
</body>
</html>
