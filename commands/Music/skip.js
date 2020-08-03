const Command = require("../../base/Command.js");

class Skip extends Command {
	constructor(client) {
		super(client, {
			name: "skip",
			description: (language) => language.get("SKIP_DESCRIPTION"),
			usage: (language, prefix) => language.get("SKIP_USAGE", prefix),
			examples: (language, prefix) => language.get("SKIP_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
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
			if (!message.member.voice.channel) return message.channel.send(message.language.get("PLAY_NO_VOICECHANNEL"));// || (message.member.voice.channel !== message.bot.voice.channel)
			return message.bot.player.skip(message.guild.id);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Skip;
