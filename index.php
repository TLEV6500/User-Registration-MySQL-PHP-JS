<?php
require_once('connect.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VILLACIN CSIT201-F2 FINAL EXAM</title>
  <link rel="stylesheet" href="style.css">
  <script type="module" src="index.js" defer></script>
  <script type="module" src="animations.js"></script>
</head>

<body>
  <nav id="form_nav">
    <h1 class="title">User Registration Form</h1>
    <!-- <div class="form-nav-btns">
       JS INSERTION HERE 
    </div> -->
  </nav>

  <div class="main-container">
    <section id="section_welcome" class="section welcome" data-cur-view="true">
      <?php
        session_start();
        if ($_SESSION['firstname']) $firstname = $_SESSION['firstname'];
        else $firstname = null;
        $message = '';
        $note = null;
        $action = '';
        if ($firstname) {
          $message = "Welcome $firstname.";
          $note = "Not You?";
          $action = "Switch Account";
        }
        else {
          $message = "Welcome.";
          $action = "Register Now";
        }
        echo "<h2>$message</h2>";
        if ($note) echo "<p class=\"not-you\">$note</p>";
        echo "<button class=\"btn-primary btn\">$action</button>";
      ?>
    </section>
  
    <main id="main_form" class="hide-right">
      <button class="btn-return btn" tabindex="4">Back</button>
      <form action="processForm.php" method="post" id="form_body" target="_self">
        <!-- JS INSERTION HERE -->
      </form>
      <button class="btn-next btn" tabindex="2">Next</button>
    </main>
  </div>


  <footer id="footer">
    <span>Tim Leobert E. Villacin</span>
    <span>TLEV©2024</span>
    <span>CSIT-F2 FINAL EXAM</span>
  </footer>
</body>

</html>