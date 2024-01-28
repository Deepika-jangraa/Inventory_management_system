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

// Prepare the SQL statement
$stmt = $conn->prepare("UPDATE inventory SET item_name = ?, quantity = ? WHERE id = ?");

// Bind the variables to the statement as parameters
$stmt->bind_param("sii", $itemName, $quantity, $itemId);

// Get data from the POST request
$itemId = $_POST['itemId'];
$itemName = $_POST['itemName'];
$quantity = $_POST['quantity'];

// Execute the statement
if ($stmt->execute()) {
    echo "Item updated successfully";
} else {
    echo "Error: " . $stmt->error;
}

// // Get data from the POST request
// $itemId = $_POST['itemId'];
// $itemName = $_POST['itemName'];
// $quantity = $_POST['quantity'];

// // Update item in the inventory table (replace "inventory" with your table name)
// $sql = "UPDATE inventory SET item_name = '{$_POST['itemName']}', quantity = {$_POST['quantity']} WHERE id = {$_POST['itemId']}";


// if ($conn->query($sql) === TRUE) {
//     echo "Item updated successfully";
// } else {
//     echo "Error: " . $sql . "<br>" . $conn->error;
// }

// // Close the database connection
$conn->close();
?>
