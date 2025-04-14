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

    // Delete a item by ID
    deleteItem: async (req, res) => {
        try {
            const item = await Item.findById(req.params.id);
            if (item) {
                console.log('Item found:', item); // Log the item if it exists
                await Item.findByIdAndDelete(req.params.id);
            }else {
                console.log('Item not found'); // Log if the item does not exist
            }

            res.redirect('/items'); // After deletion, redirect to the item view
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

};


//     addList: async (req, res) => {
//         try {
//             const newList = new List(req.body);
//             await newList.save();
//             res.redirect('/list');
//         } catch (err) {
//             console.error(err);
//             res.redirect('/item?error=true');
//         }
//     },
//     updateList: async (req, res) => {
//         const { id } = req.params;
//         const { name, description } = req.body;
//         try {
//             await List.findByIdAndUpdate(id, { name, description });
//             res.redirect('/list');
//         } catch (err) {
//             console.error(err);
//             res.redirect('/list?error=true');
//         }
//     },
//     deleteList: async (req, res) => {
//         const { id } = req.params;
//         try {
//             await List.findByIdAndDelete(id);
//             res.redirect('/list');
//         } catch (err) {
//             console.error(err);
//             res.redirect('/list?error=true');
//         }
//     }
// };