<!DOCTYPE html>
<html>
  <head>
    <title>My Blog</title>
    <link rel="stylesheet" href="" type="text/css" />
    <meta></meta>
  </head>
  <body>
    <?php include 'menuView.php';?>
    <h1>Contact Page</h1>
    <form method='POST'>
      <input type="text" name="firstName" placeholder="Enter your first name"/>
      <input type="text" name="email" placeholder="Enter your email"/>
      <input type="text" name="message" placeholder="Enter your message"/>
      <button id="submit-btn" name="submit" value="1">Submit</button>
      <!--<button id="submit-btn">Submit</button>-->
    </form>
  </body>
</html>