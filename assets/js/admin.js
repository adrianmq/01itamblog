/*global $*/
/*global removeClassIfExists*/
var BASE_URL = 'https://siitamblog-adrianmq.c9users.io';

$(document).ready(function(){
  // grab form after data-id
  var $form = $('[data-id="admin-login-form"]');

  // call login method on admin login view
  if( $form.length !== 0 ){ login($form) }

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
});

function login($form) {
  var $formChildren = $form[0].children;

  // grab children after name || type || id
  var $formEmail = $($formChildren['email']);
  var $formPassword = $($formChildren['password']);
  var $loginButton = $($formChildren['admin-login']);
  
  // to decide when to enable tooltip
  enableTooltip($('.after-input'), {
    email: 'siit_web6@grr.la',
    password: 'siit1234!'
  });

  // listen to login button
  $loginButton.on('click', function() {
    event.preventDefault();

    var emailValue = $formEmail.val();
    var passwordValue = $formPassword.val();

    // when the first form child isn't an input, like an error container
    if( ! $form.children().first().is('input') ){
      // remove element from DOM
      $form.children().first().remove();
    }
    
    // check if input fields are filled
    var fieldStatus = checkInputField($form);
    
    if( fieldStatus ){
      // authenticate(emailValue, passwordValue);
      var xmlHttpResult = authenticate(emailValue, passwordValue);
      
      // handle response
      xmlHttpResult.onreadystatechange = function() {
        if ( xmlHttpResult.readyState == 4 ) {
          if ( xmlHttpResult.status == 206 ) {
            // throw error // normally it shouldn't reach here
            throw new Error(xmlHttpResult.response['message']);
          }
          else if ( xmlHttpResult.status == 403 ){
            // show message
            $form.children().first().before(
              '<li class="input-error">'+xmlHttpResult.response['message']+'</li>'
              );
            // complain
            throw new Error(xmlHttpResult.response);
          }
          else {
            // redirect to admin page
            window.location.pathname = '/admin';
          }
        }
      };
    }
  })
}

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
  // send parameters
  xmlHttp.send(params);

  return(xmlHttp);
}

function checkInputField($form) {
  var fieldStatus = 1;
  
  // run over filtered children
  $form.children('input').map(function(){
    var $this = $(this),
        $inputType = this.type,
        $inputError = $this.next().next();

    if( !$this.val() ){
      removeClassIfExists($this, 'green-border');
      $this.addClass('red-border');
      
      removeClassIfExists($inputError, 'hide');
      
      // build error message and make it visible
      $inputError.html($inputType[0].toUpperCase() + $inputType.slice(1) + ' required').addClass('show');
      
      fieldStatus = 0;
    }
    else {
      removeClassIfExists($this, 'red-border');
      $this.addClass('green-border');

      removeClassIfExists($inputError, 'show');
      $inputError.addClass('hide');
    }
  });
  
  return fieldStatus;
}

function enableTooltip($jqElem, objInfoMsgData){
  // implement tooltip independently over each info-icon
  $.each($('.after-input'), function(index, domElem){
    // store jquery elem inside varibles
    var $jqueryInput = $(domElem);
    var inpName = $jqueryInput.prev().attr('name');

    var $infoIcon = $(domElem.children[0]);
    var $infoMsgRef = $(domElem.children[1]);

    // build info message
    $infoMsgRef.text(objInfoMsgData[inpName]);

    $infoIcon.on("mouseover",function(){
      $infoMsgRef.css('visibility', 'visible');
    })
  
    $infoIcon.on("mouseout",function(){
      $infoMsgRef.css('visibility', 'hidden');
    })
  })
}