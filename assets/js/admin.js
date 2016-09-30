/*global $*/
/*global BASE_URL*/
/*global removeClassIfExists*/
$(function(){
  var $pathname = window.location.pathname;
  // request only when path is accessed
  if($pathname.match('^/admin$')){
    var admin = new Admin();
    admin.getArticles();
    
    $('#select-all').on("click",function(e){
      admin.selectAllArticles();
    })

    var $checkboxes = $('.article-select');
    $checkboxes.on("click",function(e){
      admin.uncheckSelectAll($checkboxes);
    })

    $('.delete-article').on("click",function(e){
      e.preventDefault();
      admin.deleteArticle();
    })
  }
});

function Admin(){
  this.url = BASE_URL + '/admin';
};

Admin.prototype.getArticles = function(){
  var admin = this;
  $.ajax({
    url: admin.url + '/articles',
    method: 'GET',
    async: false,
    success: function(response) {
      var articleData = JSON.parse(response);
      var adminTable = $(".articles-table");
      
      if( articleData.length === 0 ) {
        adminTable.css('margin-bottom', 0);
        adminTable.children("tbody").html('');
        adminTable.after('<div class="no-table-content">No data available</div>');
      }
      else {
        var articlesHtml = "";
        for(var i = 0; i < articleData.length; i++) {
          var state = articleData[i].published == 1 ? 'published' : 'private';
          articlesHtml += 
            '<tr data-id="'+ articleData[i].id +'">'+
              '<td data-id="'+ articleData[i].id +'" class="check-article-row">'+
                '<input type="checkbox" class="article-select 3">'+
              '</td>'+
              '<td name="article-title" class="editable">'+ articleData[i].title +'</td>'+
              '<td name="article-content" class="editable">'+ articleData[i].content +'</td>'+
              '<td name="article-category" class="editable">'+ articleData[i].category +'</td>'+
              '<td name="article-state" class="editable">'+ state +'</td>'+
              '<td name="article-rating" class="editable">'+ articleData[i].rating +'</td>'+
            '</tr>';
        }
        adminTable.children("tbody").html(articlesHtml);
      }
    },
    error: function(response) {
      throw new Error(response);
    }
  });
}

Admin.prototype.deleteArticle = function(){
  var admin = this;
  var articleIds;
  var $articlesToDelete = $("input:checkbox:checked.article-select");
  var $errorMessage = $(".admin-container-error");

  if( $articlesToDelete.length ) {
    articleIds = [].map.call($articlesToDelete, function(article){
      return $(article).closest("tr").data("id")
    });
    $errorMessage.addClass('hide');
  }
  else {
    $errorMessage.children("span").html('No articles selected!');
    removeClassIfExists($errorMessage, 'hide');
  }

  if( articleIds && articleIds.length !== 0 ){
    $.ajax({
      url: admin.url + '/articles/delete',
      method: 'DELETE',
      data: {'articleIds': articleIds},
      success: function(response) {
        console.log(response);

        var jsonResponse = JSON.parse(response);
        console.log(jsonResponse.deleted);
        if(jsonResponse.deleted !== 0){
          console.log(jsonResponse.deleted);
          $errorMessage.addClass('hide');
          admin.getArticles();
        }
        else {
          console.log('error');
          var string = articleIds.length > 1 ? 'articles!' : 'article!';
          $errorMessage.children("span").html('Failed to remove selected '+ string);
          removeClassIfExists($errorMessage, 'hide');
        }
      }
    });    
  }
}

Admin.prototype.selectAllArticles = function(selectAll){
  $("#select-all").prop("checked") 
    ? $(".article-select").prop("checked", !0)
    : $(".article-select").prop("checked", !1);
}

Admin.prototype.uncheckSelectAll = function($checkboxes){
  var selectedAll = 1;
  $.each($checkboxes, function(v,k){
    if( !$(k).is(':checked') ){
      selectedAll = 0;
      return false;
    }
  })

  if( $("#select-all").is(':checked') && selectedAll === 0 ){

    $("#select-all").prop("checked", !1);
  }
  else if( !$("#select-all").is(':checked') && selectedAll === 1 ){

    $("#select-all").prop("checked", !0);
  }
}