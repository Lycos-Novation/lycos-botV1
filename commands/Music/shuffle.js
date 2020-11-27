const Command = require("../../base/Command.js");

class Shuffle extends Command {
    constructor(client) {
        super(client, {
            name: "shuffle",
            description: (language) => language.get("SHUFFLE_DESCRIPTION"),
            usage: (language, prefix) => language.get("SHUFFLE_USAGE", prefix),
            examples: (language, prefix) => language.get("SHUFFLE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            aliases: ["random"],
            botPermissions: ["SEND_MESSAGES"],
            cooldown: 2000,
        });
    }

    async run(message) {
        try {
            let trackPlaying = message.bot.player.isPlaying(message);
            if (!trackPlaying) {
                return message.channel.send(message.language.get("NOT_PLAYING"));
            }
            if (!message.member.voice.channel) return message.channel.send(message.language.get("PLAY_NO_VOICECHANNEL"));
            message.bot.player.shuffle(message).then(() => {
                message.channel.send(message.language.get("SHUFFLED"));
           });
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Shuffle;
