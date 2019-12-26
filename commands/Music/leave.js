const Command = require("../../base/Command.js");

class Leave extends Command {
	constructor(client) {
		super(client, {
			name: "leave",
			description: (language) => language.get("LEAVE_DESCRIPTION"),
			usage: (language, prefix) => language.get("LEAVE_USAGE", prefix),
			examples: (language, prefix) => language.get("LEAVE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			const queue = message.bot.lavalink.getQueue(message.bot.config.lavalink.queues, message.guild.id);

			if (!message.bot.player.get(message.guild.id)) {
				return message.channel.send("I'm not connected to any voice channel.");
			}
			if(!message.member.voice.channel) {
				return message.channel.send("You need to be in a voice channel to play music! ");
			}

			if (queue.length > 0) {
				queue.splice(0, queue.length);
			}

			await message.bot.player.leave(message.guild.id);
			return message.channel.send("I left the voice channel.");
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Leave;
