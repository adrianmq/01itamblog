/*global $*/
/*global BASE_URL*/
// window.addEventListener("load",function(){
$(function(){
  var $pathname = window.location.pathname;
  // request only when path is accessed
  if($pathname.match('^/admin$')){
    // main
    var admin = new Admin();
    
    admin.getArticles();
    
    
    console.log($pathname);
    console.log(admin);
    // var delete = $('.articles-list').on('click', '[data-id]');
  }
  else{
    console.log('other' + $pathname); 
  }
});

function Admin(){
  this.url = BASE_URL + '/admin';
};

Admin.prototype.getArticles = function(){
  $.ajax({
    url: this.url + '/articles',
    success: function(response) {
      console.log(response);
      
      var articleData = JSON.parse(response);
      console.log(articleData);
      // var articlesHtml = "";
      // for(var i=0; i < response.length; i++) {
      //   articlesHtml += '<div>' +
      //                   '<div>' + response[i].title + '</div>' +
      //                   '<div><button data-id="' + response[i].id + '">Delete</button></div>' +
      //                   '</div>';

      // }
      // $('.articles-list').html(articlesHtml);
    },
    error: function(response) {
      throw new Error(response);
    }
  });
}

Admin.prototype.deleteArticle = function(){
  var id = $(this).data('id');
  $.ajax({
    url: this.url + '/articles/delete',
    method: 'DELETE',
    data: {'id': id},
    success: function(response) { 
      if(response.deleted == 1){
        this.getArticles();
      }
      else {
        alert('Failed to remove article!');
      }
    }
  });    
}

