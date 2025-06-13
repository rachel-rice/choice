// Import Mongoose library to define and work with MongoDB schemas
const mongoose = require('mongoose')

// Define the schema for an Item document in MongoDB
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Optional item description: string
    description: {
        type: String
    }
})

// Export the model 
// The model is named 'Item' and is based on the ItemSchema
module.exports = mongoose.model('Item', ItemSchema)