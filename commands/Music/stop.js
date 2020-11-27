const Command = require("../../base/Command.js");

class Stop extends Command {
	constructor(client) {
		super(client, {
			name: "stop",
			description: (language) => language.get("STOP_DESCRIPTION"),
			usage: (language, prefix) => language.get("STOP_USAGE", prefix),
			examples: (language, prefix) => language.get("STOP_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["disconnect"],
			permLevel: "Server Moderator",
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
			message.bot.player.clearQueue(message);
			message.bot.player.stop(message);
			return message.channel.send(message.language.get("STOPPED"));
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Stop;
