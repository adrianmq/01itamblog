<h1><?php echo $pageTitle;?></h1>
<input type="text" id="searchArticles" name="search-articles" class="after-input" placeholder="Search articles"/>
<div class="table-responsive col-md-12">
  <table class="table table-hover table-striped table-bordered responsive articles-view-table">
    <thead class="should-be-sortable">
      <tr>
        <th align="top" class="modal-cat2" width="20" height="15">
          <input type="checkbox" id="select-all">
        </th>
        <th name="article-id" id="articleHeaderId" align="top" class="modal-cat2">Id</th>
        <th name="article-title" id="articleHeaderTitle" align="top" class="modal-cat2">Title</th>
        <th name="article-content" id="articleHeaderContent" align="top" class="modal-cat2">Content</th>
      </tr>
    </thead>
    <tbody class="should-be-sortable">
    <?php foreach($articles as $article) { ?>
      <tr name="article-data-row" data-id="<?php echo $article["id"];?>">
        <td align="top" class="modal-cat2" width="20" height="15">
          <input type="checkbox" id="select-all">
        </td>
        <td name="article-id" align="top" class="modal-cat2"><?php echo $article["id"];?></td>
        <td name="article-title" align="top" class="modal-cat2"><?php echo $article["title"];?></td>
        <td name="article-content" align="top" class="modal-cat2"><?php echo $article["content"];?></td>
      </tr>
    <?php } ?>
    </tbody>
  </table>
</div>
