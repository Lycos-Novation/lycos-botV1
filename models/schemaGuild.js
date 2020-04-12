const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {defaultSettingsGuild: defaults} = require('../config');
const guildSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectID,
    guildId: String,
    guildName: String,
    language: {
        type: String,
        default: defaults.language
    },
    prefix: {
        type: String,
        default: defaults.prefix
    },
    autorole: [],
    channels: {
        welcome: {
            type: String,
            default: defaults.channels.welcome
        },
        leave: {
            type: String,
            default: defaults.channels.leave
        },
        logs: {
            type: String,
            default: defaults.channels.logs
        },
        modlogs: {
            type: String,
            default: defaults.channels.modlogs
        },
        suggestions: {
            type: String,
            default: defaults.channels.suggestions
        },
        rolereaction: {
            type: String,
            default: defaults.channels.rolereaction
        },
        reports: {
            type: String,
            default: defaults.channels.reports
        }
    },
    modules: {
        welcome: {
            type: Boolean,
            default: defaults.modules.welcome
        },
        leave: {
            type: Boolean,
            default: defaults.modules.leave
        },
        games: {
            type: Boolean,
            default: defaults.modules.games
        },
        nsfw: {
            type: Boolean,
            default: defaults.modules.nsfw
        },
        nsfwHentai: {
            type: Boolean,
            default: defaults.modules.nsfwHentai
        },
    },
});

module.exports = mongoose.model('Guild', guildSchema);