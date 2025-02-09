const Item = require("../models/Item");

module.exports = {
    getItems: async (req, res) => {
        try {
            const items = await Item.find({});
            res.render('item', { items });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    },
    addItem: async (req, res) => {
        try {
            const newItem = new Item(req.body);
            await newItem.save();
            res.redirect('/item');
        } catch (err) {
            console.error(err);
            res.redirect('/item?error=true');
        }
    },
    updateItem: async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            await Item.findByIdAndUpdate(id, { name, description });
            res.redirect('/item');
        } catch (err) {
            console.error(err);
            res.redirect('/item?error=true');
        }
    },
    deleteItem: async (req, res) => {
        const { id } = req.params;
        try {
            await Item.findByIdAndDelete(id);
            res.status(200).json({ message: 'Item deleted successfully' });
        } catch (err) {
            console.error(err);
            res.redirect('/item?error=true');
        }
    }
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