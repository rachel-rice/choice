const mongoose = require('mongoose')

// Define the schema
const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  listId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'List', 
    required: true 
  }
}, { timestamps: true });

// Export the model 
module.exports = mongoose.model('Item', ItemSchema)