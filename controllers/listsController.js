const List = require('../models/List');
const Item = require('../models/Item');

module.exports = {
  // Show all lists
  getLists: async (req, res) => {
    try {
      let lists;
      if (req.user) {
        lists = await List.find({ userId: req.user._id });
      } else {
        lists = req.session.guestLists || [];
      }

        res.render('lists', { user: req.user, lists });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  // Show items in a list
  getListById: async (req, res) => {
    try {
      let list;
      if (req.user) {
        list = await List.findOne ({
          _id: req.params.id,
          userId: req.user._id
        });
      } else {
       // Guest: fetch from session
      list = (req.session.guestLists || []).find(l => l._id == req.params.id);
      if (!list) return res.status(404).send("List not found");
      const items = list.items || [];
      return res.render('items', { list, items });
    }
    } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
    }
  },

     

  // Create new list
  createList: async (req, res) => {
    try {
      const { name } = req.body;
      let newList = {
        name,
        items: []
      };

      if (req.user) {
        newList.userId = req.user._id;
      await List.create(newList);
      } else {
         // Guest: store in session instead of database
        req.session.guestLists = req.session.guestLists || [];
        req.session.guestLists.push(newList);
      }
    
      res.redirect('/lists');
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  // Update list by ID
  updateList: async (req, res) => {
    try {
      const updated = await List.findByIdAndUpdate(
        { _id: req.params.id, userId: req.user._id },
        { name: req.body.name }
      );

      if (!updated) {
        return res.status(404).send("List not found");
      }

      res.redirect('/lists');
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  // Delete a list by ID
  deleteList: async (req, res) => {
    try {
      const deleted = await List.findByIdAndDelete({
        _id: req.params.id,
        userId: req.user._id
      });

      if (!deleted) {
        return res.status(404).json({ error: 'List not found' });
      }

      // Delete all items associated with this list
      await Item.deleteMany({ listId: req.params.id });
      res.status(200).json({ message: 'List deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  }
};
