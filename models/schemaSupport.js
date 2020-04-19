const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const supportSchema = new Schema({
    id: String,
    username : String,
    question: String,
    channelID: String
});

module.exports = mongoose.model('Support', supportSchema);