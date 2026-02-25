const List = require('../models/List');
const Item = require('../models/Item');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // Show all lists
  getLists: async (req, res) => {
    try {
      let lists = [];

      if (req.user) {
        lists = await List.find({ userId: req.user._id });
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
      let list = null;
      let items = [];

      // Logged-in user: fetch from DB
      if (req.user) {
        list = await List.findOne ({
          _id: req.params.id,
          userId: req.user._id
        });

        if (!list) {
          return res.status(404).send("List not found");
        }

        items = await Item.find({ listId: list._id });
      } 
      res.render("items", {
        user: req.user,
        list,
        items
      });
      
      // else {
      //   // Guest: fetch from session
      //   const guestLists = req.session.guestLists || [];
      //   list = guestLists.find(l => l._id.toString() === req.params.id.toString());

      //   if (!list) {
      //     return res.status(404).send("List not found");
      //   }

      //   // Guest lists may store items directly in the list object
      //   items = list.items || [];
      // }

      // res.render('items', { list, items });

    } catch (err) {
      console.error("Error in getListById:", err);
      res.status(500).send("Server Error");
    }
  },

  // Create new list
  createList: async (req, res) => {
    try {
      const { name } = req.body;
      // Logged in user -> save to DB
      if(!req.user) {
        return res.status(401).json({
          error: "Unauthorized: Please log in to create a list"
        });
      }
      // if (req.user) {
        await List.create({ 
          name, 
          userId: req.user._id 
        });

      res.redirect('/lists');
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  },

  // Update list by ID
  updateList: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ error: "Guests update lists locally" });
      }
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
      if (!req.user) {
        return res.status(401).json ({ error: "Guests delete lists locally"})
      }

      const deleted = await List.findByIdAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!deleted) {
      return res.status(404).json({ error: "List not found" });
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
