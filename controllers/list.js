const List = require("../models/List");

module.exports = {
    getLists: async (req, res) => {
        try {
            const items = await List.find({});
            res.render('list', { lists });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    },
    addList: async (req, res) => {
        try {
            const newList = new List(req.body);
            await newList.save();
            res.redirect('/list');
        } catch (err) {
            console.error(err);
            res.redirect('/item?error=true');
        }
    },
    updateList: async (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            await List.findByIdAndUpdate(id, { name, description });
            res.redirect('/list');
        } catch (err) {
            console.error(err);
            res.redirect('/list?error=true');
        }
    },
    deleteList: async (req, res) => {
        const { id } = req.params;
        try {
            await List.findByIdAndDelete(id);
            res.status(200).json({ message: 'List deleted successfully' });
        } catch (err) {
            console.error(err);
            res.redirect('/list?error=true');
        }
    }
};