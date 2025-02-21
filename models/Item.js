const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    list: {
        type: mongoose.Schema.Types.ObjectId, ref: 'List', // reference to parent list
        // required: true
    }
})

module.exports = mongoose.model('Item', ItemSchema)