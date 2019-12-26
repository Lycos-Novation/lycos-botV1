const Command = require("../../base/Command.js");

class Skip extends Command {
	constructor(client) {
		super(client, {
			name: "skip",
			description: (language) => language.get("SKIP_DESCRIPTION"),
			usage: (language, prefix) => language.get("PLAY_USAGE", prefix),
			examples: (language, prefix) => language.get("PLAY_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			if(!message.member.voice.channel) {
				return message.channel.send("You need to be in a voice channel to skip a music!");
			}
			if (!message.bot.player.get(message.guild.id)) {
				return message.channel.send("I'm not playing a song.");
			}

			await message.bot.player.get(message.guild.id).stop();
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Skip;
