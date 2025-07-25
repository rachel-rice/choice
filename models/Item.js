// Import Mongoose library to define and work with MongoDB schemas
const mongoose = require('mongoose')

// Define the schema for an Item
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    //Reference to the List the item belongs to
    list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true // optional, but recommended to enforce linkage
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
})

// Export the model 
// The model is named 'Item' and is based on the ItemSchema
module.exports = mongoose.model('Item', ItemSchema)