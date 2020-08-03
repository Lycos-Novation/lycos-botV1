const Command = require("../../base/Command.js");

class Loop extends Command {
    constructor(client) {
        super(client, {
            name: "loop",
            description: (language) => language.get("LOOP_DESCRIPTION"),
            usage: (language, prefix) => language.get("LOOP_USAGE", prefix),
            examples: (language, prefix) => language.get("LOOP_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            aliases: ["repeat"],
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            cooldown: 2000,
        });
    }

    async run(message) {
        try {
            let trackPlaying = message.bot.player.isPlaying(message.guild.id);
			if (!trackPlaying) {
				return message.channel.send(message.language.get("NOT_PLAYING"));
            }
            if (!message.member.voice.channel) return message.channel.send(message.language.get("PLAY_NO_VOICECHANNEL"));
            const repeatModeEnabled = message.bot.player.getQueue(message.guild.id).repeatMode;
            if (repeatModeEnabled) {
                // if the repeat mode is currently enabled, disable it
                message.bot.player.setRepeatMode(message.guild.id, false);
                message.channel.send(message.language.get("LOOP_UNLOOPING"));
            } else {
                // if the repeat mode is currently disabled, enable it
                message.bot.player.setRepeatMode(message.guild.id, true);
                message.channel.send(message.language.get("LOOP_LOOPING"));
            }
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Loop;
