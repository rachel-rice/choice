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
      res.render('lists/show', { list, items });
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

  // Pick a random item from a list
  getRandomItem: async (req, res) => {
    try {
      const items = await Item.find({ list: req.params.id });
      if (items.length === 0) {
        return res.send("No items in this list.");
      }
      const randomItem = items[Math.floor(Math.random() * items.length)];
      res.render('lists/random', { item: randomItem });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
};
