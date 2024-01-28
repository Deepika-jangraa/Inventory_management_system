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

// Get data from the GET request
$itemId = $_GET['itemId'];

// Fetch data for the specified item from the inventory table (replace "inventory" with your table name)
$sql = "SELECT * FROM inventory WHERE id = $itemId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data as JSON
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo "Item not found";
}

// Close the database connection
$conn->close();
?>
