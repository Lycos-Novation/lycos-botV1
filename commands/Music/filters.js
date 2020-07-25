const Command = require("../../base/Command.js");

class Filters extends Command {
    constructor(client) {
        super(client, {
            name: "filters",
            description: (language) => language.get("FILTERS_DESCRIPTION"),
            usage: (language, prefix) => language.get("FILTERS_USAGE", prefix),
            examples: (language, prefix) => language.get("FILTERS_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["filter"],
            permLevel: "Server Moderator",
            cooldown: 10000,
        });
    }

    async run(message, args) {
        try {
            let trackPlaying = message.bot.player.isPlaying(message.guild.id);
            if (!trackPlaying) {
                return message.channel.send(message.language.get("NOT_PLAYING"));
            }
            const filters = {
                "bassboost": "Bassboost",
                "8D": "8D",
                "vaporwave": "Vaporwave",
                "nightcore": "Nightcore",
                "phaser": "Phaser",
                "tremolo": "Tremolo",
                "vibrato": "Vibrato",
                "reverse": "Reverse",
                "treble": "Treble",
                "normalizer": "Normalizer",
                "surrounding": "Surrounding",
                "pulsator": "Pulsator",
                "subboost": "Subboost",
                "karaoke": "Karaoke",
                "flanger": "Flanger",
                "gate": "Gate",
                "haas": "Haas",
                "mcompand": "Mcompand"
            };
            const filter = args[0];
            if (!filter) return message.channel.send(`${message.language.get("FILTERS_NO_ARGS")} ${Object.values(filters).join(", ")}`);
            if (filter === "list") {
                return message.channel.send({
                    embed: {
                        title: message.language.get("FILTERS_FILTERS"),
                        description: `Bassboost ${message.bot.player.getQueue(message.guild.id).filters.bassboost ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        8D ${message.bot.player.getQueue(message.guild.id).filters['8D'] ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Vaporwave ${message.bot.player.getQueue(message.guild.id).filters.vaporwave ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Nightcore ${message.bot.player.getQueue(message.guild.id).filters.nightcore ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Phaser ${message.bot.player.getQueue(message.guild.id).filters.phaser ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Tremolo ${message.bot.player.getQueue(message.guild.id).filters.tremolo ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Vibrato ${message.bot.player.getQueue(message.guild.id).filters.vibrato ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Reverse ${message.bot.player.getQueue(message.guild.id).filters.reverse ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Treble ${message.bot.player.getQueue(message.guild.id).filters.treble ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Normalizer ${message.bot.player.getQueue(message.guild.id).filters.normalizer ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Surrounding ${message.bot.player.getQueue(message.guild.id).filters.surrounding ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Pulsator ${message.bot.player.getQueue(message.guild.id).filters.pulsator ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Subboost ${message.bot.player.getQueue(message.guild.id).filters.subboost ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Karaoke ${message.bot.player.getQueue(message.guild.id).filters.karaoke ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Flanger ${message.bot.player.getQueue(message.guild.id).filters.flanger ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Gate ${message.bot.player.getQueue(message.guild.id).filters.gate ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Haas ${message.bot.player.getQueue(message.guild.id).filters.haas ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}
                        Mcompand ${message.bot.player.getQueue(message.guild.id).filters.mcompand ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>"}`
                    }
                });
            }
            const filterToUpdate = Object.values(filters).find((f) => f.toLowerCase() === filter.toLowerCase());

            //If he can't find the filter
            if (!filterToUpdate) return message.channel.send(`${message.language.get("FILTERS_NOT_EXISTS")} ${Object.values(filters).join(", ")}`);//This filter doesn't exist 
            const filterRealName = Object.keys(filters).find((f) => filters[f] === filterToUpdate);

            const queueFilters = message.bot.player.getQueue(message.guild.id).filters
            const filtersUpdated = {};
            filtersUpdated[filterRealName] = queueFilters[filterRealName] ? false : true;
            message.bot.player.setFilters(message.guild.id, filtersUpdated);

            if (filtersUpdated[filterRealName]) {

                //The bot adds the filter on the music
                return message.channel.send(message.language.get("FILTERS_ADDING"));

            } else {

                //The bot removes the filter from the music
                message.channel.send(message.language.get("FILTERS_REMOVING"));

            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Filters;

