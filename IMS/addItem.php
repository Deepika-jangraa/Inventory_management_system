<?php
header('Access-Control-Allow-Origin: *');
// Establish a database connection (replace these values with your database credentials)
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'inventory_management';

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the POST request
$itemName = $_POST['itemName'];
$quantity = $_POST['quantity'];

// // Call the AddItem stored procedure
// $sql = "CALL AddItem('$itemName', $quantity)";

 // Insert data into the inventory table (replace "inventory" with your table name)
$sql = "INSERT INTO inventory (item_name, quantity) VALUES ('$itemName', $quantity)";

if ($conn->query($sql) === TRUE) {
    echo "Item added successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>


