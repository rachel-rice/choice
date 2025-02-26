const Item = require("../models/Item");
const List = require('../models/List');

module.exports = {

    // Get all items (for future flexibility — e.g., searching all items)
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find();
            res.render('items', { items });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Get a single item by ID
    getItemById: async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            if (!item) {
                return res.status(404).send('Item not found');
            }
            res.render('item', { item });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Create a new item (with optional list association)
    createItem: async (req, res) => {
        try {
            const { name, description, listId } = req.body;
            const item = await Item.create({ name, description, list: listId || null });

            if (listId) {
                await List.findByIdAndUpdate(listId, { $push: { items: item._id } });
            }

            res.redirect(listId ? `/lists/${listId}` : '/items');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Update an item
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

    // Delete an item (and remove from list if applicable)
    deleteItem: async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            if (item.list) {
                await List.findByIdAndUpdate(item.list, { $pull: { items: item._id } });
            }
            await Item.findByIdAndDelete(req.params.id);

            res.redirect('/items');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
    // getItems: async (req, res) => {
    //     try {
    //         const items = await Item.find({});
    //         res.render('item', { items });
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send("Server Error");
    //     }
    // },
    // addItem: async (req, res) => {
    //     try {
    //         const newItem = new Item(req.body);
    //         await newItem.save();
    //         res.redirect('/item');
    //     } catch (err) {
    //         console.error(err);
    //         res.redirect('/item?error=true');
    //     }
    // },
    // updateItem: async (req, res) => {
    //     const { id } = req.params;
    //     const { name, description } = req.body;
    //     try {
    //         await Item.findByIdAndUpdate(id, { name, description });
    //         res.redirect('/item');
    //     } catch (err) {
    //         console.error(err);
    //         res.redirect('/item?error=true');
    //     }
    // },
    // deleteItem: async (req, res) => {
    //     const { id } = req.params;
    //     try {
    //         await Item.findByIdAndDelete(id);
    //         res.status(200).json({ message: 'Item deleted successfully' });
    //     } catch (err) {
    //         console.error(err);
    //         res.redirect('/item?error=true');
    //     }
    // }
};


// NEED TO MAKE SURE THE FOLLOWING ROUTES ARE INCLUDED

// app.get('/item', async (req, res) => {
//     const items = await Item.find({})
//     res.render('item', {items})
// })

// //Create
// app.post('/item', async (req, res) => {
//     const newItem = new Item(req.body)
//     try {
//         await newItem.save()
//         res.redirect('/item')
//     } catch (err) {
//         res.redirect('/item?error=true')
//     }
// })

// //Update
// app.post('/item/update/:id', async (req, res) => {
//     const {id} = req.params
//     const {name, description} = req.body
//     try {
//       await Item.findByIdAndUpdate(id, {name, description})
//       res.redirect('/item')
//     } catch (err) {
//         res.redirect('/item?error=true')
//     }
// })

// //Delete
// app.delete('/item/update/:id', async (req, res) => {
//     const {id} = req.params
//     try {
//       await Item.findByIdAndDelete(id)
//       res.status(200).json({message: 'Item deleted successfully'})
//     } catch (err) {
//         res.redirect('/item?error=true')
//     }
// })