/*global $*/
var authAttempts = 0;

$(document).ready(function(){

  var $form = $('[data-id="admin-login-form"]');
  var $formChildren = $form[0].children;

  $($formChildren['admin-login']).on('click', function() {
    event.preventDefault();

    var emailValue = $formChildren['email'].value;
    var passwordValue = $formChildren['password'].value;

    // send authentication request ONLY 3 times
    if (authAttempts < 3) { authenticate(emailValue, passwordValue) }
  })
});

function authenticate(emailValue, passwordValue) {
  var urlToCall = 'https://web6-adrianmatei-adrianmq.c9users.io/blog/admin/login';
  var method = 'POST';
  var params = `email=${emailValue}&password=${passwordValue}`;
  
  var xmlHttp = new XMLHttpRequest();
  // define request method, ASYNC
  xmlHttp.open(method, urlToCall, true);
  // expecting JSON response
  xmlHttp.responseType = 'json';
  // set req header as url encoded
  xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  xmlHttp.onreadystatechange = function() {
    if ( xmlHttp.readyState == 4 ) {
      if ( xmlHttp.status == 206 ) {
        var resp = xmlHttp.response;

        console.log(resp);  
        console.log(resp.warning);  
      }
      else if ( xmlHttp.status == 400 ){
        
        console.log(xmlHttp.response);
      }  
      else if ( xmlHttp.status == 401 ){
        authAttempts++;
        console.log(xmlHttp.response);
      }
      else {
        console.log(xmlHttp.status);
        console.log(xmlHttp.response);
        console.log(window.location.href);
        console.log(window.location.pathname);
        console.log(window.location.host);
        window.location.pathname = '/blog/admin';
      }
    }
  };
  
  // xmlHttp.send(params, {'body':  null});
  xmlHttp.send(params);
  console.log('done');
}



// CODE DUMP