/*global $*/
/*global BASE_URL*/
/*glabal Admin*/
/*glabal AdminLogin*/
window.onload = function(){
  var admin = new Admin();
  var adminLogin = new AdminLogin();
  var articlesView = new ArticlesView();

  var $pathname = window.location.pathname;
  // request only when path is accessed
  if($pathname.match('^/admin$')){
    admin.initiateEvents();
    adminLogin.logout();
  }

  if($pathname.match('^/admin/login$')){
    adminLogin.viewHandler();
  }
  
  if($pathname.match('^/articles$')){
    articlesView.tableHeader();
  }
  
};
