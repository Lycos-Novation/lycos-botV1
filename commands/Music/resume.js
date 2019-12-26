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
			if (!player) { return message.channel.send("There is nothing playing that I could resume for you."); }
			if (!player.playing) { return message.channel.send("There is nothing playing that I could resume for you."); }
			await player.pause(false);
			return message.channel.send("⏸ The music was resumed.");
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Resume;
