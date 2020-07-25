const Command = require("../../base/Command.js");

class Remove extends Command {
    constructor(client) {
        super(client, {
            name: "remove",
            description: (language) => language.get("REMOVE_DESCRIPTION"),
            usage: (language, prefix) => language.get("REMOVE_USAGE", prefix),
            examples: (language, prefix) => language.get("REMOVE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            cooldown: 2000,
        });
    }

    async run(message, args) {
        try {
            let trackPlaying = message.bot.player.isPlaying(message.guild.id);
            if (!trackPlaying) {
                return message.channel.send(message.language.get("NOT_PLAYING"));
            }
            const toRemove = args[0];
            if (!toRemove || isNaN(parseInt(toRemove))) return message.channel.send(message.language.get("REMOVE_NO_ARGS"))
            message.bot.player.remove(message.guild.id, parseInt(toRemove))
                .then(() => {
                    return message.channel.send(message.language.get("REMOVE_REMOVED"))//'Removed track!'
                })
                .catch(err => {
                    return message.channel.send(message.language.get("ERROR", err));
                })
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Remove;
