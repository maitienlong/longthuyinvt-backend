const mongoose = require('mongoose')

const khachmoiSchema = new mongoose.Schema({
    idperson: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('khachmoi', khachmoiSchema)