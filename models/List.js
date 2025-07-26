const mongoose = require('mongoose');

// Define the schema for a List
const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

module.exports = mongoose.model('List', ListSchema);

