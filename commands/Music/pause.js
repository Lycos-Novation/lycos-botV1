const Command = require("../../base/Command.js");

class Pause extends Command {
	constructor(client) {
		super(client, {
			name: "pause",
			description: (language) => language.get("PAUSE_DESCRIPTION"),
			usage: (language, prefix) => language.get("PAUSE_USAGE", prefix),
			examples: (language, prefix) => language.get("PAUSE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Moderator",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			let trackPlaying = message.bot.player.isPlaying(message.guild.id);
			if (!trackPlaying) {
				return message.channel.send(message.language.get("NOT_PLAYING"));
			}
			const track = await message.bot.player.pause(message.guild.id);
			return message.channel.send(`\`${track.name}\` ${message.language.get("PAUSED")}`);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Pause;
