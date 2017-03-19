/*global $*/
/*global removeClassIfExists*/
/*global BASE_URL*/
function AdminLogin(){
  this.url = BASE_URL + '/admin/login';
};

AdminLogin.prototype.viewHandler = function() {
  var adminLogin = this;
  // grab login form after data-id
  var $loginForm = $('[data-id="admin-login-form"]');

  // call login method on admin login view
  if ( $loginForm.length !== 0 ) {
    adminLogin.enableTooltip();

    var $formChildren = $loginForm[0].children;

    // grab children after name || type || id
    var $formEmail = $($formChildren['email']);
    var $formPassword = $($formChildren['password']);
    var $loginButton = $($formChildren['admin-login']);

    // listen to login button
    $loginButton.on('click', function(){
      event.preventDefault();
    
      var emailValue = $formEmail.val();
      var passwordValue = $formPassword.val();
    
      // when the first form child isn't an input, like an error container
      if( !$loginForm.children().first().is('input') ){
        // remove element from DOM
        $loginForm.children().first().remove();
      }
      
      // check if input fields are filled
      var fieldStatus = adminLogin.checkInputField($loginForm);

      if ( fieldStatus ) {
        // authenticate(emailValue, passwordValue);
        var xmlHttpResult = adminLogin.authenticate(emailValue, passwordValue);
        
        adminLogin.responseHandler(xmlHttpResult, $loginForm);
      }
    });
  }
}

AdminLogin.prototype.responseHandler = function(xmlHttpResult, $loginForm) {
  // handle response
  xmlHttpResult.onreadystatechange = function() {
    if ( xmlHttpResult.readyState == 4 ) {
      if ( xmlHttpResult.status == 206 ) {
        // throw error // normally it shouldn't reach here
        throw new Error(xmlHttpResult.response['message']);
      }
      else if ( xmlHttpResult.status == 403 ){
        // show message
        $loginForm.children().first().before(
          '<li class="input-error">'+xmlHttpResult.response['message']+'</li>'
          );
        // complain
        throw new Error(xmlHttpResult.response['message']);
      }
      else {
        // redirect to admin page
        window.location.pathname = '/admin';
      }
    }
  };
};

AdminLogin.prototype.logout = function() {
  // listen to logout button
  $('#admin-logout').on('click', function(){
    var urlToCall = BASE_URL + '/admin/logout';
    var method = 'POST';
    
    var xmlHttp = new XMLHttpRequest();
    // define request method, ASYNC
    xmlHttp.open(method, urlToCall, true);
    // send parameters
    xmlHttp.send();
    // handle response
    xmlHttp.onreadystatechange = function() {
      if ( xmlHttp.readyState == 4 ) {
        if ( xmlHttp.status == 200 ) {
          // redirect to admin page
          window.location.pathname = '/admin/login';
        }
        else {
          // redirect to admin page
          throw new Error(xmlHttp.response);
        }
      }
    };
  })
}

AdminLogin.prototype.authenticate = function(emailValue, passwordValue) {
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
  // send parameters
  xmlHttp.send(params);

  return(xmlHttp);
}

AdminLogin.prototype.checkInputField = function($form) {
  var fieldStatus = 1;
  
  // run over filtered children
  $form.children('input').map(function(){
    var $this = $(this),
        $inputType = this.type,
        $inputError = $this.next().next();

    if( !$this.val() ){
      removeClassIfExists($this, 'green-border');
      $this.addClass('black-border');
      
      removeClassIfExists($inputError, 'hide');
      
      // build error message and make it visible
      $inputError.html($inputType[0].toUpperCase() + $inputType.slice(1) + ' required').addClass('show');
      
      fieldStatus = 0;
    }
    else {
      removeClassIfExists($this, 'black-border');
      $this.addClass('green-border');

      removeClassIfExists($inputError, 'show');
      $inputError.addClass('hide');
    }
  });
  
  return fieldStatus;
}

AdminLogin.prototype.enableTooltip = function(){
  // to decide when to enable tooltip
  var infoData = {
    email: 'Admin email address',
    password: 'Admin password'
  };

  // implement tooltip independently over each info-icon
  $.each($('.after-input'), function(index, domElem){
    // store jquery elem inside varibles
    var $jqueryInput = $(domElem);
    var inpName = $jqueryInput.prev().attr('name');

    var $infoIcon = $(domElem.children[0]);
    var $infoMsgRef = $(domElem.children[1]);

    // build info message
    $infoMsgRef.text(infoData[inpName]);

    $infoIcon.on("mouseover",function(){
      $infoMsgRef.css('visibility', 'visible');
    })
  
    $infoIcon.on("mouseout",function(){
      $infoMsgRef.css('visibility', 'hidden');
    })
  })
}