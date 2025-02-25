const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: { type: String,
        required: true
    },
    description: {
        type: String,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }] // array of item references
})

module.exports = mongoose.model('List', ListSchema);