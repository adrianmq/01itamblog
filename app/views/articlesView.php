<h1><?php echo $pageTitle;?></h1>
<?php foreach($articles as $article) { ?>
    <div>
        <span><?php echo $article["title"];?></span>
        <p><?php echo $article["content"];?></p>
    </div>
<?php } ?>
