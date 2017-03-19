/*global $*/
/*global BASE_URL*/
/*glabal Admin*/
/*glabal AdminLogin*/
window.onload = function(){
  console.log('main');
  var admin = new Admin();
  var adminLogin = new AdminLogin();

  var $pathname = window.location.pathname;
  // request only when path is accessed
  if($pathname.match('^/admin$')){
    admin.initiateEvents();
    adminLogin.logout();
  }

  if($pathname.match('^/admin/login$')){
    adminLogin.viewHandler();
  }
};
