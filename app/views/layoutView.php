<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" href="<?php echo LVL.CSS; ?>style.css" type="text/css" />
    <title>a-blog</title>
</head>
<body>
    <div class="container">
        <?php include "menuView.php"; ?>
        <?php include $pageContent;?>
    </div>

    <script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?php echo LVL.JS; ?>helpers.js"></script>
    <!--<script type="text/javascript" src="<php echo JS; ?>app.js"></script>-->
    <script type="text/javascript" src="<?php echo LVL.JS; ?>admin.js"></script>
</body>
</html>
