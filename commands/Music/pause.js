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
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			if (!message.bot.player.get(message.guild.id)) {
				return message.channel.send("I'm not connected to any voice channel.");
			}
			if(!message.member.voice.channel) {
				return message.channel.send("You need to be in a voice channel to play music! ");
			}

			const player = message.bot.player.get(message.guild.id);
			if (!player) { return message.channel.send("There is nothing playing that I could pause for you."); }
			if (!player.playing) { return message.channel.send("There is nothing playing that I could pause for you."); }
			await player.pause(true);
			return message.channel.send("⏸ The music was paused.");
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Pause;
