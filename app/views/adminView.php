<div class="admin-container-error hide">
  <span id="article-table-error" class="input-error"></span>
</div>
<div class="admin-container">
  <div id="articles-list-content" class="clearfix">
    <div class="admin-toolbar">
      <button id="admin-logout" class="">Sign Out</button>
      <div class="action-icon pull-left">
        <div data-toggle="modal" data-target="#addArticleModal" class="add-article">
          <span title="Add article">Add article</span>
        </div>
      </div>
      <div class="action-icon pull-left">
        <div data-toggle="modal" data-target="#deleteArticleModal" class="delete-article">
          <span title="Add article">Delete article</span>
        </div>
      </div>
    </div>

    <div class="add-article-container clearfix hide">
      <div data-toggle="modal" data-target="#closeAddArticle" onmouseover="" class="close-add-article">
        <span title="close-add-article-card">x</span>
      </div>
      <h4 class="text-xs-center m-t-3" style="color:#145A32;">Add Article</h4>
      <form id="addArticleForm" class="form-horizontal m-x-auto" style="width:50%;">
        <div class=" row">
          <div class="form-group col-xs-12">
            <input id="articleTitle" type="text" class="form-control input-md input-app-fix" placeholder="Article title"/>
          </div>
        </div>
        <div class=" row">
          <div class="form-group col-xs-12 select-article">
            <select id="selectCategory" type="text" name="selectCategory" class="form-control input-md input-app-fix" aria-invalid="false"/>
              <option value="0">Select category</option>
              <option value="1">HTML</option>
              <option value="2">CSS</option>
              <option value="3">MySQL</option>
              <option value="4">PHP</option>
              <option value="5">Javascript</option>
              <option value="6">Perl</option>
            </select>
          </div>
        </div>
        <div class=" row">
          <div class="form-group col-xs-12">
            <input id="articleContent" type="text" class="form-control input-md input-app-fix" placeholder="Content"/>
          </div>
        </div>
        <div class=" row">
          <div class="form-group col-xs-12">
            <input id="saveArticle" class="btn btn-danger btn-block" value="SAVE ARTICLE"/>
          </div>
        </div>
      </form>
    </div>

    <div class="table-responsive col-md-12">
      <table class="table table-hover table-striped table-bordered responsive articles-table">
        <thead class="should-be-sortable">
          <tr>
            <th align="top" class="modal-cat2" width="20" height="15">
              <input type="checkbox" id="select-all">
            </th>
            <th align="top" class="modal-cat2">Title</th>
            <th align="top" class="modal-cat2">Content</th>
            <th align="top" class="modal-cat2">Category</th>
            <th align="top" class="modal-cat2">State</th>
            <th align="top" class="modal-cat2">Rating</th>
          </tr>
        </thead>
        <tbody class="should-be-sortable">
        </tbody>
      </table>
    </div>
  </div>
</div>