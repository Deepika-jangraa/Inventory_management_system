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
$itemId = $_POST['itemId'];

// Delete item from the inventory table (replace "inventory" with your table name)
$sql = "DELETE FROM inventory WHERE id = $itemId";

if ($conn->query($sql) === TRUE) {
    echo "Item deleted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
