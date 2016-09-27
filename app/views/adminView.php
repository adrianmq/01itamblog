<div class="admin-container">
  <!--<div class="articles-list"></div>-->
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
  <div class="table-responsive col-md-12">
    <table class="table table-hover table-striped table-bordered responsive articles-table">
      <thead class="should-be-sortable">
        <tr>
          <th align="top" class="modal-cat2" width="20" height="15">
            <input type="checkbox" id="select-all">
          </th>
          <th align="top" class="modal-cat2">
            Title
            <!--<span class="glyphicon glyphicon-chevron-up up-down" id="order-by" data-sort="last_name" data-type="asc"></span>-->
          </th>
          <th align="top" class="modal-cat2">Content</th>
          <th align="top" class="modal-cat2">Category</th>
          <th align="top" class="modal-cat2">State</th>
          <th align="top" class="modal-cat2">Rating</th>
        </tr>
      </thead>
      <tbody class="should-be-sortable">
        <tr data-id="1">
          <td class="check-article-row">
            <input type="checkbox" class="article-select">
          </td>
          <td class="editable"></td>
          <td class="editable"></td>
          <td class="editable"></td>
          <td class="editable"></td>
          <td class="editable"></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>