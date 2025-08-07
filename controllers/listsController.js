const List = require('../models/List');
const Item = require('../models/Item');

module.exports = {
  // Show all lists
  getLists: async (req, res) => {
    try {
      const lists = await List.find().sort({ name: 1 });
      res.render('lists', { lists });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  // Show items in a list
  getListById: async (req, res) => {
    try {
      const list = await List.findById(req.params.id);
      const items = await Item.find({ list: list._id });
      res.render('items', { list, items });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  // Create new list
  createList: async (req, res) => {
    try {
      await List.create({ name: req.body.name });
      res.redirect('/lists');
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  updateList: async (req, res) => {
    try {
      await List.findByIdAndUpdate(req.params.id, { name: req.body.name });
      res.redirect('/lists');
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },
  // Delete a list by ID
  deleteList: async (req, res) => {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'List deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  }
};
