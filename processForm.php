<?php
session_unset();
session_destroy();
session_start();
// Include the database connection script
require_once('connect.php');

// Check if the form data is set
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Access form data
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];
  $birthday = $_POST['birthday'];
  $gender = $_POST['gender'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password

  // Check for any existing user with same email
  $checkExisting = $conn->prepare("SELECT * FROM users WHERE email = ?");
  $checkExisting->bind_param("s", $email);
  $checkExisting->execute();
  
  // If user already exists, do not insert to db
  $checkExisting->store_result();
  $post = null;
  if ($checkExisting->num_rows == 0) {
    $post = $conn->prepare("INSERT INTO users (firstname, lastname, birthday, gender, email, password) VALUES (?, ?, ?, ?, ?, ?)");
    $post->bind_param("ssssss", $firstname, $lastname, $birthday, $gender, $email, $password);
    if ($post->execute() == false) {
      http_response_code(500);
      echo "Error: " . $post->error;
    }
  }

  $_SESSION['firstname'] = $firstname;
  // Close the statement and connection
  if ($post) $post->close();
  $checkExisting->close();
  $conn->close();
  http_response_code(200);
} else {
  http_response_code(400);
  echo "Invalid request method.";
}
// Return to form page after submission
header("Location: {$_SERVER['HTTP_REFERER']}");