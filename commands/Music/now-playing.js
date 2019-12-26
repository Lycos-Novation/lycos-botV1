const Command = require("../../base/Command.js");
const moment = require("moment");

class NowPlaying extends Command {
	constructor(client) {
		super(client, {
			name: "now-playing",
			description: (language) => language.get("PLAY_DESCRIPTION"),
			usage: (language, prefix) => language.get("PLAY_USAGE", prefix),
			examples: (language, prefix) => language.get("PLAY_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["np"],
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			const queue = message.bot.lavalink.getQueue(message.bot.config.lavalink.queues, message.guild.id);
			if(!message.member.voice.channel) {
				return message.channel.send("You need to be in a voice channel!");
			}

			if (!message.bot.player.get(message.guild.id)) {
				return message.channel.send("I'm not playing a song.");
			}
			if (queue.length === 0) {
				return message.channel.send("The queue is currently empty.");
			}
			const duration = moment.duration({ ms: queue[0].info.duration });
			const currentDuration = moment.duration({ ms: message.bot.player.get(message.guild.id).state.position * 1000 });
			return message.channel.send({
				embed: {
					"author": {
						"name": "Now playing",
						"icon_url" : message.guild.iconURL(),
					},
					"description": `[${queue[0].info.title}](${queue[0].info.url}) by${queue[0].info.author}\nDuration: [${moment(currentDuration / 1000).minutes()}:${moment(currentDuration / 1000).seconds()}] ----- [${duration.minutes()}:${duration.seconds()}]`,
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = NowPlaying;
