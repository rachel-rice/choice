const Item = require("../models/Item");
const { v4: uuidv4 } = require("uuid");

module.exports = {
    // Get all items
    getAllItems: async (req, res) => {
        try {
            const items = await Item.find() // Fetch all items from the database
            res.render('items', { items }); // Render the 'items' view and pass the items
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

          res.redirect('/items'); // Redirect to items list after update
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
          let items = [];

            if(req.user) {
              const userLists = await List.find({ userId: req.user._id });
              const listIds = userLists.map(l => l._id);
              items = await Item.find({ listId: { $in: listIds } });
            } else {
              const guestLists = req.session.guestLists || [];
              guestLists.forEach(list => {
                if (list.items && list.items.length) {
                  items.push(...list.items);
            }
        });
  }
            if (items.length === 0) {
                return res.status(404).json({ message: "No items available to pick." });
            }
            const randomIndex = Math.floor(Math.random() * items.length);
            const randomItem = items[randomIndex]; // Pick a random item
            res.json(randomItem); // Send the random item as JSON
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server Error' });
        }
    }
};

