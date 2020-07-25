const Command = require("../../base/Command.js");

class Resume extends Command {
	constructor(client) {
		super(client, {
			name: "resume",
			description: (language) => language.get("RESUME_DESCRIPTION"),
			usage: (language, prefix) => language.get("RESUME_USAGE", prefix),
			examples: (language, prefix) => language.get("RESUME_EXAMPLES", prefix),
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
			const track = await message.bot.player.resume(message.guild.id);
			return message.channel.send(`\`${track.name}\` ${message.language.get("RESUMED")}`);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Resume;
