<form method="POST" action="login" data-id="admin-login-form">
  <input type="email" data-id="admin-email" name="email" placeholder="Enter email address"/>
    <div class="after-input tooltip">
      <div id="tooltip" class="visible-icon"></div>
      <div id="tooltip-info" class="info"></div>
    </div>
    <li id="email-error" class="input-error hide"></li>
  <input type="password" data-id="admin-pass" name="password" placeholder="Enter password"/>
    <div class="after-input tooltip">
      <div id="tooltip" class="visible-icon"></div>
      <div id="tooltip-info" class="info"></div>
    </div>
    <li id="pass-error" class="input-error hide"></li>
  <!--<input type="email" data-id="admin-email" name="email" placeholder="Enter your email"/>-->
  <!--<input type="password" data-id="admin-pass" name="password" placeholder="Enter your password"/>-->
  <button id="admin-login">Login</button>
</form>