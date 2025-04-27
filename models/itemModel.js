const Item = require('./Item'); // <- pull in your Mongoose model

async function getAllItems() {
  try {
    const items = await Item.find(); // fetches ALL items from your MongoDB
    return items;
  } catch (error) {
    console.error('Error getting items from database:', error);
    throw error;
  }
}

module.exports = { getAllItems };
