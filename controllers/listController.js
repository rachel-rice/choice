const List = require("../models/List");

module.exports = {
    // Get all lists with their items
    getAllLists: async (req, res) => {
        try {
            const lists = await List.find().populate('items');
            res.render('lists', { lists });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    },

    // Get a single list by ID
    getListById: async (req, res) => {
        try {
            const list = await List.findById(req.params.id).populate('items');
            res.render('list', { list });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Create a new list
    createList: async (req, res) => {
        try {
            const { name, description } = req.body;
            await List.create({ name, description, items: [] });
            res.redirect('/lists');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

     // Update a list by ID
     updateList: async (req, res) => {
        try {
            const { name, description } = req.body;
            await List.findByIdAndUpdate(req.params.id, { name, description });
            res.redirect('/lists');
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Delete a list by ID
    deleteList: async (req, res) => {
        try {
            const list = await List.findById(req.params.id);
            if (list) {
                // Delete related items before deleting the list
                await Item.deleteMany({ list: list._id });
                // Delete the list itself
                await List.findByIdAndDelete(req.params.id);
            }

            res.redirect('/lists'); // After deletion, redirect to the list view
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