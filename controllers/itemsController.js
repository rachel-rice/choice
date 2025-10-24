const Item = require("../models/Item");
const List = require("../models/List");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    // Get all items
    getAllItems: async (req, res) => {
        try {
      const items = await Item.find() // Fetch all items from the database
      // Provide a safe default `list` object so the `items` view can render
      // even when no specific list is selected (prevents template errors).
      const list = { _id: '', name: 'All Items' };
      res.render('items', { items, list }); // Render the 'items' view and pass the items + list
        } catch (err) {
            console.error(err);
            res.status(500).send("Server Error");
        }
    },

    // Get a single item by ID
    getItemById: async (req, res) => {
        try {
            const item = await Item.findById(req.params.id); // Find item by ID
            res.render('item', { item }); // Render the 'item' view with the found item
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

    // Create a new item
    createItem: async (req, res) => {
        try {
            const { name, description, list } = req.body; // Extract fields from the request body
            
            if (req.user) {
              await Item.create({ 
                name, 
                description: description || undefined,
                listId: list
              }); 
            } else {
              req.session.guestLists = req.session.guestLists || [];
              const guestList = req.session.guestLists.find(l => l._id === list);  

              if (!guestList) {
                return res.status(404).send("Guest list not found");
              }

              guestList.items.push({
                _id: uuidv4(),
                name,
                description: description || ''
              });
            }

            res.redirect(`/lists/${list}`);// Redirect to list of items after creation
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

     // Update a item by ID
     updateItem: async (req, res) => {
        try {
            const { name, description, listId } = req.body; 

            if (req.user) {
            await Item.findByIdAndUpdate(req.params.id, { name, description }); // Update item
            } else {
              const guestLists = req.session.guestLists || [];
              const guestList = guestLists.find(
                (l) => l._id.toString() === listId.toString()
            );
                if (!guestList) return res.status(404).send("Guest list not found");

                  const item = guestList.items.find(
                 (i) => i._id.toString() === req.params.id.toString()
                );
                if (!item) return res.status(404).send("Item not found");

                item.name = name;
                item.description = description || "";
            }

          // Redirect back to the parent list after updating the item.
          // Prefer the listId sent in the form (works for guests and most cases).
          let redirectUrl = '/items';
          if (listId) {
            redirectUrl = `/lists/${listId}`;
          } else if (req.user) {
            // If no listId in the form but user is authenticated, try to read it from the item record.
            const updated = await Item.findById(req.params.id).select('listId');
            if (updated && updated.listId) redirectUrl = `/lists/${updated.listId}`;
          }

          res.redirect(redirectUrl); // Redirect to the appropriate list page after update
        } catch (err) {
          console.error(err);
          res.status(500).send('Server Error');
        }
    },

    // Delete an item by ID
  deleteItem: async (req, res) => {
    try {
      const { listId } = req.body; // For guests, we need the parent list

      if (req.user) {
        await Item.findByIdAndDelete(req.params.id);
      } else {
        const guestLists = req.session.guestLists || [];
        const guestList = guestLists.find(
          (l) => l._id.toString() === listId.toString()
        );
        if (!guestList) return res.status(404).send("Guest list not found");

        guestList.items = guestList.items.filter(
          (i) => i._id.toString() !== req.params.id.toString()
        );
      }

      res.status(200).json({ message: "Item deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  },

    // Fetch a random item from the list
    getRandomItem: async (req, res) => {
  try {
    const listId = req.params.listId || req.query.listId;
    if (!listId) {
      return res.status(400).json({ message: "Missing list ID." });
    }

    let items = [];

    if (req.user) {
      // Logged-in user → only get items from that user's list
      items = await Item.find({ listId });
    } else {
      // Guest user → only get items from their session list
      const guestLists = req.session.guestLists || [];
      const list = guestLists.find(l => l._id === listId);
      if (!list) {
        return res.status(404).json({ message: "Guest list not found." });
      }
      items = list.items || [];
    }

    if (items.length === 0) {
      return res.status(404).json({ message: "No items available in this list." });
    }

    const randomItem = items[Math.floor(Math.random() * items.length)];
    res.json(randomItem);
  } catch (err) {
    console.error("Error in getRandomItem:", err);
    res.status(500).json({ error: "Server Error" });
  }
}
};

