const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true,
        unique: true,
        maxLength: 42,  //default ethereum address length
        minLength: 42
    },
    shilaPoint: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('WaitingShilaRequests', userSchema);