// Import Express to create a router
const express = require('express');

// Create a new router object
const router = express.Router();

// Import the itemsController to handle item-related logic
const itemsController = require("../controllers/itemsController");

// Item routes
router.get('/', itemsController.getAllItems); 
router.get('/:id', itemsController.getItemById);

// Handles form submissions for creating, updating, and deleting items
router.post('/add/:listId', itemsController.createItem);
// Update item by item id (client sends item id in the URL)
router.post('/update/:id', itemsController.updateItem);
// Expect item id in the URL when deleting: /items/delete/:id
router.delete('/delete/:id', itemsController.deleteItem);

// Random item picker route
router.get('/api/random/:listId', itemsController.getRandomItem);

// Export the router to be used in the main app
module.exports = router;