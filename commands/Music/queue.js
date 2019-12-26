const Command = require("../../base/Command.js");

class Queue extends Command {
	constructor(client) {
		super(client, {
			name: "queue",
			description: (language) => language.get("QUEUE_DESCRIPTION"),
			usage: (language, prefix) => language.get("QUEUE_USAGE", prefix),
			examples: (language, prefix) => language.get("QUEUE_EXAMPLES", prefix),
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
			if (queue.length === 0) {
				return message.channel.send("The queue is currently empty.");
			}
			const text = queue.slice(0, 14).map((song, i) => (i > 0 && i < 14 ? "**" + i + "** - **" + song.info.title + "**" + " - Added by **" + song.author + "**" : null)).join("\n");
			message.channel.send("Queue:\n\n" + (queue.length === 1 ? "**The queue is empty !**" : text) + (queue.length > 14 ? "\nand more..." : "") + "\n\nNow playing: **" + queue[0].info.title + "** - Added by **" + queue[0].author + "**")
				.catch((error) => {
					if (error) {
						return message.channel.send(message.language.get("ERROR", error));
					}
				});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Queue;
