const mongoose = require('mongoose')

const loichucSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    loichuc: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('loichuc', loichucSchema)