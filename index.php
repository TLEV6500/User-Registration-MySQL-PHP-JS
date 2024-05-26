<?php
session_start();
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
</head>

<body>
  <nav id="form_nav">
    <h1 class="title">User Registration Form</h1>
    <!-- <div class="form-nav-btns">
       JS INSERTION HERE 
    </div> -->
  </nav>

  <section id="section_welcome" class="section welcome">
    <?php
      $firstname = $_SESSION['firstname'];
      if ($firstname) echo "Welcome $firstname.";
      else echo "Welcome."
    ?>
  </section>

  <main id="main_form">
    <form action="processForm.php" method="post" id="form_body" target="_self">
      <!-- JS INSERTION HERE -->
    </form>
  </main>

  <footer id="footer">
    <span>Tim Leobert E. Villacin</span>
    <span>TLEV©2024</span>
    <span>CSIT-F2 FINAL EXAM</span>
  </footer>
</body>

</html>