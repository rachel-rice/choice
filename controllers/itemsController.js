const Item = require("../models/Item");

module.exports = {
    // Get all items
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find()
            res.render('items', { items });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    },

    // Get a single item by ID
    getItemById: async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            res.render('item', { item });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Create a new item
    createItem: async (req, res) => {
        try {
            const { name, description } = req.body;
            await Item.create({ name, description });
            res.redirect('/items');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

     // Update a item by ID
     updateItem: async (req, res) => {
        try {
            const { name, description } = req.body;
            await Item.findByIdAndUpdate(req.params.id, { name, description });
            res.redirect('/items');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },
    // Delete an item by ID

    deleteItem: async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            if (item) {
                console.log('Item found:', item); // Log the item if it exists
                await Item.findByIdAndDelete(req.params.id);
                console.log('Item deleted successfully'); // Log after successful deletion
            } else {
                console.log('Item not found'); // Log if the item does not exist
            }
    
            // Send a JSON response instead of redirecting
            res.status(200).json({ message: 'Item deleted successfully' });
        } catch (err) {
            console.error('Error deleting item:', err);
            res.status(500).json({ error: 'Server Error' });
        }
    }
};
