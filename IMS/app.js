$(document).ready(function () {
    // // Load initial inventory data
    loadInventory();
});
    // Function to load inventory data
    function loadInventory() {
        // AJAX request to get inventory data from the server (Assuming you have getInventory.php)
        $.ajax({
            type: 'GET',
            url: 'getInventory.php', // Update with the correct URL
            success: function (data) {
                // Parse the received JSON data
                const inventoryData = JSON.parse(data);
    
                // Clear the existing table rows
                $('#inventoryTableBody').empty();
    
                // Iterate through the inventory data and append rows to the table
                for (const item of inventoryData) {
                    const row = `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.item_name}</td>
                            <td>${item.quantity}</td>
                            <td>
                                <button class="btn btn-info view-btn" onclick="viewItem(${item.id})">View</button>
                                <button class="btn btn-warning edit-btn" onclick="editItem(${item.id})">Edit</button>
                                <button class="btn btn-danger delete-btn" onclick="deleteItem(${item.id})">Delete</button>
                            </td>    
                        </tr>
                    `;
    
                    // Append the row to the table
                    $('#inventoryTableBody').append(row);
                }
            },
            error: function (error) {
                console.error('Error loading inventory:', error);
            }
        });
    }
    

    
    // $(document).ready(function () {
    // Handle form submission for adding items
    $('#addItemForm').submit(function (event) {
        event.preventDefault();

        const itemName = $('#itemName').val();
        const quantity = $('#quantity').val();

        if (!itemName || !quantity || quantity <= 0) {
            alert('Please enter valid data.');
            return;
        }
    
        $.ajax({
            type: "POST",
            url: "addItem.php",
            data: { itemName: itemName, quantity: quantity },
            success: function(response) {
                alert("Item added successfully");
                // Reload the table with the new item
                loadInventory(); // Reload the inventory table after adding an item
                $('#addItemModal').modal('hide'); // Close the modal
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Failed to add item: " + textStatus);
            }
        });
    });
// });
        // // Add item to the database
        // $.ajax({
        //     type: 'POST',
        //     url: 'addItem.php',
        //     data: {itemName: itemName, quantity: quantity},
        //     dataType: 'html',  // Specify the expected data type
        //     success: function (response) {
        //         loadInventory(); // Reload the inventory table after adding an item
        //         $('#addItemModal').modal('hide'); // Close the modal
        //     },
        //     error: function (error) {
        //         console.error('Error adding item:', error);
        //     }
        // });
    // });

    // Handle form submission for editing items
    $('#editItemForm').submit(function (event) {
        event.preventDefault();
        // console.log('Edit form submitted'); // Add this line

        const itemId = $('#itemId').val();
        const itemName = $('#itemNameEdit').val();
        const quantity = $('#quantityEdit').val();
        // console.log('Form values:', itemId, itemName, quantity); // Add this line

        if (!itemId || !itemName || !quantity || quantity <= 0) {
            alert('Please enter valid data.');
            return;
        }

        // Update item in the database
        $.ajax({
            type: 'POST',
            url: 'updateItem.php',
            data: {itemId: itemId, itemName: itemName, quantity: quantity},
            success: function (response) {
                // console.log('Update successful. Response:', response);
                loadInventory(); // Reload the inventory table after updating an item
                $('#editItemModal').modal('hide'); // Close the modal
            },
            error: function (error) {
                console.error('Error updating item:', error);
            }
        });
    });
    

    // Function to load inventory data
    function loadInventory() {
        // Fetch data from the database
        $.ajax({
            type: 'GET',
            url: 'getInventory.php',
            success: function (data) {
                $('#inventoryTableBody').html(data); // Populate the table body with inventory data
            },
            error: function (error) {
                console.error('Error loading inventory:', error);
            }
        });
    }

    
    // Function to view item details
    function viewItem(itemId) {
        // AJAX request to get item details from the server (Assuming you have getItem.php)
        $.ajax({
            type: 'GET',
            url: 'getItem.php', // Update with the correct URL
            data: {itemId: itemId},
            success: function (data) {
                // Parse the received JSON data
                const itemDetails = JSON.parse(data);
    
                // Update the modal content with item details
                $('#viewItemId').text('Item ID: ' + itemDetails.id);
                $('#viewItemName').text('Item Name: ' + itemDetails.item_name);
                $('#viewItemQuantity').text('Quantity: ' + itemDetails.quantity);
    
                // Show the view item modal
                $('#viewItemModal').modal('show');
            },
            error: function (error) {
                console.error('Error fetching item details:', error);
            }
        });
    }
    

    // Function to edit item details
    function editItem(itemId) {
        // Implement your logic to populate a form for editing (e.g., show a modal with pre-filled data)
        $.ajax({
            type: 'GET',
            url: 'getItem.php',
            data: {itemId: itemId},
            success: function (data) {
                const itemDetails = JSON.parse(data);
                $('#itemNameEdit').val(itemDetails.item_name);
                $('#quantityEdit').val(itemDetails.quantity);
                $('#itemId').val(itemId);
                $('#editItemModal').modal('show');
            },
            error: function (error) {
                console.error('Error fetching item details:', error);
            }
        });
        return false; // Add this line to prevent form submission
    }

    // Function to delete item
    function deleteItem(itemId) {
        const confirmation = confirm("Are you sure you want to delete this item?");

        if (confirmation) {
            // Delete item from the database
            $.ajax({
                type: 'POST',
                url: 'deleteItem.php',
                data: {itemId: itemId},
                success: function (response) {
                    loadInventory(); // Reload the inventory table after deleting an item
                },
                error: function (error) {
                    console.error('Error deleting item:', error);
                }
            });
        }
    }

    // Event listener for view button click
    $(document).on('click', '.view-btn', function () {
        const itemId = $(this).data('item-id');
        viewItem(1);
    });

    // Event listener for edit button click
    $(document).on('click', '.edit-btn', function () {
        const itemId = $(this).data('item-id');
        editItem(1);
    });

    // Event listener for delete button click
    $(document).on('click', '.delete-btn', function () {
        const itemId = $(this).data('item-id');
        deleteItem(1);
    });

    
