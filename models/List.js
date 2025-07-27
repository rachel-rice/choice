const mongoose = require('mongoose');

// Define the schema
const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true }); 

// Export the model 
module.exports = mongoose.model('List', ListSchema);
