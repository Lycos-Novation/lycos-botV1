const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {defaultSettingsProject: defaults} = require('../config');
const projectSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name : String,
    lead: String,
    desc: {
        type: String,
        default: defaults.desc
    },
    members: {
        type: [String],
        default: defaults.members
    },
    tasks: {
        type: [String],
        default: defaults.tasks
    },
    done: {
        type: [String],
        default: defaults.done
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);