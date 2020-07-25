const Command = require("../../base/Command.js");

class ClearQueue extends Command {
    constructor(client) {
        super(client, {
            name: "clear-queue",
            description: (language) => language.get("CLEARQUEUE_DESCRIPTION"),
            usage: (language, prefix) => language.get("CLEARQUEUE_USAGE", prefix),
            examples: (language, prefix) => language.get("CLEARQUEUE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "Server Moderator",
            aliases: ["clearqueue", "clear-music", "clear-musics"],
            cooldown: 2000,
        });
    }

    async run(message, args) {
        try {
            let trackPlaying = message.bot.player.isPlaying(message.guild.id);
            if (!trackPlaying) {
                return message.channel.send(message.language.get("NOT_PLAYING"));
            }
            message.bot.player.clearQueue(message.guild.id);
            return message.channel.send(message.language.get("CLEARQUEUE_CLEARED"));
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = ClearQueue;
