// Import Mongoose library to define and work with MongoDB schemas
const mongoose = require('mongoose')

// Define the schema for an Item
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }
}, { timestamps: true });

// Export the model 
// The model is named 'Item' and is based on the ItemSchema
module.exports = mongoose.model('Item', ItemSchema)