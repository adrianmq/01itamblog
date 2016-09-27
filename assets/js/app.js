/*global $*/
/*global BASE_URL*/
window.addEventListener("load",function(){
  // we're sure that DOM is fully loaded here
  var $pathname = window.location.pathname;

  if($pathname.match('^/admin$')){
    // list articles
    var admin = new Admin();
    
    console.log($pathname);
    console.log(admin);
  }
  else{
    console.log('other' + $pathname); 
  }
});

function Admin(){
  var url = BASE_URL + '/admin';

  $('.articles-list').on('click', '[data-id]', function() {
    var id = $(this).data('id');
    $.ajax({
      url: url + '/articles/delete',
      method: 'DELETE',
      data: {'id': id},
      success: function(response) { 
        if(response.deleted == 1){
          getArticles();
        }
        else {
          alert('Failed to remove article!');
        }
      }
    });    
  });

  function getArticles() {
    $.ajax({
      url: url + '/articles',
      success: function(response) {
        // console.log(response);
        
        var articlesHtml = "";
        for(var i=0; i < response.length; i++) {
          articlesHtml += '<div>' +
                          '<div>' + response[i].title + '</div>' +
                          '<div><button data-id="' + response[i].id + '">Delete</button></div>' +
                          '</div>';

        }
        $('.articles-list').html(articlesHtml);
      },
      error: function(response) {
        throw new Error(response);
      }
    });
  }
};




