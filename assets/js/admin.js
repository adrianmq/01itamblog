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

    // var $selectCategory = $('#selectCategory');
    // $selectCategory.on("click",function(e){
    //   admin.showCategories($selectCategory);
    // })

    var $addArticleCard = $(".add-article-container");
    $('.add-article').on("click",function(e){
      e.preventDefault();
      admin.addArticleCard($addArticleCard);
    })
    
    var $saveArticle = $("#saveArticle");
    $saveArticle.click(function(e){
      admin.addArticle();
    })

    $('.delete-article').on("click",function(e){
      e.preventDefault();
      admin.deleteArticle();
    })

    $(".close-add-article").on("click",function(e){
      e.preventDefault();
      if( !$addArticleCard.hasClass('hide') ){
        $addArticleCard.slideToggle(500);
        $addArticleCard.addClass('hide');
      }
    })
  }
});

function Admin(){
  this.url = BASE_URL + '/admin';
};

Admin.prototype.getArticles = function(){
  var admin = this;
  admin['categories'] = {};
  
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
          admin['categories'][articleData[i].category] = i;

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

Admin.prototype.addArticleCard = function($addArticleCard){
  var admin = this;
  $addArticleCard.slideToggle(500);
  removeClassIfExists($addArticleCard, 'hide');
  
  // admin['categoriesAll'] = JSON.parse(admin.getCategories());
}

Admin.prototype.addArticle = function(){
  var admin = this;
  var $messageSlot = $(".admin-container-error");
  var linkedFields = {
    title: 'articleTitle',
    category: 'selectCategory',
    content: 'articleContent'
  },
  incompleteData = [],
  completeData = {};    
  
  $.map(linkedFields, function(selectorId, selectorName){
    var $selector = $("#"+selectorId);

    if(( !$selector.val() || parseInt($selector.val(), 10) === 0 )){
      if( $selector.siblings("span").length === 0 ){
        $selector.css('border-bottom', '3px solid #c9302c');
        $selector.after(
          '<span id="pass-meter-info" name="'+selectorName+'Warn" class="pass-meter-aux" style="font:12px; width:300px; color:#c9302c;">'+
          'Incomplete data for '+selectorName+'</span>'
        );
      }
      incompleteData.push($selector);
    }
    else {
      $selector.css('border-bottom', '1px solid #435160');
      $selector.siblings().map(function(index, sibling){
        var $jQelem = $(sibling);
        if(($jQelem.attr('name') == selectorName+"Icon") || ($jQelem.attr('name') == selectorName+"Warn")){
          
          $jQelem.remove();
        }
      });
      
      completeData[selectorName] = $selector; 
    }
  });
  
  if( !incompleteData.length ){
    var categoryName = completeData['category'].find("option:selected").text(),
      articleTitle = completeData['title'].val(),
      articleContent = completeData['content'].val();

    $.ajax({
      url: admin.url + '/articles/create',
      type:"POST",
      data:{
        categoryName: categoryName,
        articleTitle: articleTitle,
        articleContent: articleContent
      },
      success: function(response) {
        $messageSlot.children("span").html('Added a new article!');
      },
      error: function(response) {
        throw new Error(response);
      }
    });
  };
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
        var jsonResponse = JSON.parse(response);
        if(jsonResponse.deleted !== 0){
          $errorMessage.addClass('hide');
          admin.getArticles();
        }
        else {
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

Admin.prototype.showCategories = function($selectCategory){
  var admin = this;
  var option = $selectCategory.children("option");
  
  $selectCategory.children("option").nextAll().remove();

  $.each(admin.categoriesAll, function(index,name){
    var value = index + 1;
    var newOption = '<option value="'+value+'">'+name+'</option>';
    $(newOption).insertAfter($(option));
    
    // set this option as the last one
    option = $selectCategory.children("option").last();
  })
}

Admin.prototype.getCategories = function(){
  var admin = this;

  var getCat = $.ajax({
    url: admin.url + '/articles/categories',
    async: false,
    type:"GET",
    success: function(response) {
      return response;
    },
    error: function(response) {
      throw new Error(response);
    }
  });
  return getCat.responseText;
}