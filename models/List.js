const mongoose = require('mongoose');

// Define the schema

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
  ], 
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

// Export the model 
module.exports = mongoose.model('List', ListSchema);
