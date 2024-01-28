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

// Fetch data from the inventory table (replace "inventory" with your table name)
$sql = "SELECT * FROM inventory";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data as a table row
    while ($row = $result->fetch_assoc()) { 
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['item_name']}</td>
                <td>{$row['quantity']}</td>
                <td>
                <button class='btn btn-info btn-sm' onclick='viewItem({$row['id']})'>View</button>
                <button class='btn btn-warning btn-sm' onclick='editItem({$row['id']})'>Edit</button>
                <button class='btn btn-danger btn-sm' onclick='deleteItem({$row['id']})'>Delete</button>
                </td>
              </tr>";
    }
} else {
    echo "<tr><td colspan='4'>No items in inventory</td></tr>";
}

// Close the database connection
$conn->close();
?>
