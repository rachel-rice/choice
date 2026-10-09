const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

// Show all lists
router.get('/', listsController.getLists);

// Create a new list
router.post('/add', listsController.createList);

// Guest list items page
router.get('/guest/:id', (req, res) => {
  res.render('guestItems', {
    listId: req.params.id
  });
});

// Show a single list by ID (with items)
router.get('/:id', listsController.getListById);

// Update a list by ID
router.post('/update/:id', listsController.updateList);

// Delete a list by ID
router.delete('/delete/:id', listsController.deleteList);

module.exports = router;
