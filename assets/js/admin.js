/*global $*/
/*global removeClassIfExists*/
var BASE_URL = 'https://siitamblog-adrianmq.c9users.io';

$(document).ready(function(){
  // grab form after data-id
  var $form = $('[data-id="admin-login-form"]');
  var $formChildren = $form[0].children;

  var $formEmail = $($formChildren['email']);
  var $formPassword = $($formChildren['password']);
  var $loginButton = $($formChildren['admin-login']);

  $loginButton.on('click', function() {
    event.preventDefault();

    var emailValue = $formEmail.val();
    var passwordValue = $formPassword.val();

    $form.children('input').map(function(){
      var $this = $(this),
          $inputType = this.type,
          $inputError = $this.next().next();

      if( ! $this.val() ){
        // build error message and make it visible
        removeClassIfExists($this, 'green-border');
        $this.addClass('red-border');
        
        removeClassIfExists($inputError, 'hide');
        
        $inputError.html($inputType[0].toUpperCase() + $inputType.slice(1) + ' required').addClass('show');
      }
    })

    // authenticate(emailValue, passwordValue);
    var xmlHttpResult = authenticate(emailValue, passwordValue);
    
    // handle response
    xmlHttpResult.onreadystatechange = function() {
      if ( xmlHttpResult.readyState == 4 ) {
        if ( xmlHttpResult.status == 206 ) {
          var resp = xmlHttpResult.response;
          console.log(resp);
          console.log(resp['message']);
        }
        else if ( xmlHttpResult.status == 403 ){
          console.log(xmlHttpResult.status);
          console.log(xmlHttpResult.response);
        }
        else {
          // redirect to admin page
          console.log(xmlHttpResult.status);
          console.log(xmlHttpResult.response);
          console.log(window.location.href);
          console.log(window.location.pathname);
          console.log(window.location.host);
          // window.location.pathname = '/admin';
        }
      }
    };
    
  })
});

function authenticate(emailValue, passwordValue) {
  var urlToCall = BASE_URL + '/admin/login';
  var method = 'POST';
  var params = `email=${emailValue}&password=${passwordValue}`;
  
  var xmlHttp = new XMLHttpRequest();
  // define request method, ASYNC
  xmlHttp.open(method, urlToCall, true);
  // expecting JSON response // applies JSON parse
  xmlHttp.responseType = 'json';
  // set req header as url encoded
  xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  // xmlHttp.onreadystatechange = function() {
  //   if ( xmlHttp.readyState == 4 ) {
  //     if ( xmlHttp.status == 206 ) {
  //       var resp = xmlHttp.response;

  //       console.log(resp);  
  //       console.log(resp.warning);  
  //     }
  //     else if ( xmlHttp.status == 400 ){
        
  //       console.log(xmlHttp.response);
  //     }  
  //     else if ( xmlHttp.status == 401 ){
  //       console.log(xmlHttp.response);
  //     }
  //     else {
  //       // redirect to admin page
  //       console.log(xmlHttp.status);
  //       console.log(xmlHttp.response);
  //       console.log(window.location.href);
  //       console.log(window.location.pathname);
  //       console.log(window.location.host);
  //       window.location.pathname = '/admin';
  //     }
  //   }
  // };
  
  xmlHttp.send(params);
  console.log('done');
  
  return(xmlHttp);
}



// CODE DUMP
  // forbidden input
  // var badInput= new RegExp([
  // /\s/      // any whitespace character (space, tab, form feed, and so on)
  // ,/\b/     // backspace
  // // ,/\r/     // anchor
  // ].map(function(r) {return r.source}).join(''));