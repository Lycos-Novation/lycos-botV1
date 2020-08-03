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
			botPermissions: ["SEND_MESSAGES"],
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			function generateEmbed(index, tracks, np) {
		if (tracks !== message.language.get("NOT_PLAYING")){
			if (index + 10 > tracks.length) {
                    var toShow = tracks.slice(index, tracks.length).map((track, i) => {
						return `${`#${i+index}`} - [${track.name} | ${track.author}](${track.url})`;
					}).join('\n');
                } else {
                    toShow = tracks.slice(index, index + 10).map((track, i) => {
						return `${`#${i+index}`} - [${track.name} | ${track.author}](${track.url})`;
					}).join('\n');
                }
			} else {
			var toShow = message.language.get("QUEUE_EMPTY");
			}
				const embed = {
					color: message.config.embed.color,
						title: message.language.get("QUEUE_ACTUAL"),
						thumbnail: {
							url: np.thumbnail,
						},
						description: `**${message.language.get("NOWPLAYING")}**
[${np.name}](${np.url})
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
**${message.language.get("QUEUE_ACTUAL")}**
${toShow}`,
						timestamp: new Date(),
						footer: {
							text: message.config.embed.footer,
						},

				}
				return embed
			};


			let trackPlaying = message.bot.player.isPlaying(message.guild.id);
			if (!trackPlaying) {
				return message.channel.send(message.language.get("NOT_PLAYING"));
			}
			const queue = await message.bot.player.getQueue(message.guild.id);
			var tracks;
			if (queue.tracks.length === 0) {
				tracks = message.language.get("NOT_PLAYING");
			} else {
				tracks = queue.tracks
			}



			let np = await message.bot.player.nowPlaying(message.guild.id);
			const author = message.author;
			message.channel.send({ embed: generateEmbed(0, tracks, np) }).then(async (answer) => {
				if (tracks.length <= 10 || tracks === message.language.get("NOT_PLAYING")) return;
				await answer.react('➡️');
				const collector = answer.createReactionCollector(
					(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
				)
				let index = 0;
				collector.on('collect', reaction => {
					answer.reactions.removeAll().then(async () => {
						if (reaction.emoji.name === '⬅️') {
							index = (index - 10) < 0 ? index : index - 10;
						} else if (reaction.emoji.name === '➡️') {
							index = (index + 10) > tracks.length ? index : index + 10;
						}
						answer.edit({ embed: generateEmbed(index, tracks, np) });
						if (index !== 0) await answer.react('⬅️');
						if (index + 10 < tracks.length) await answer.react('➡️');
					})
				})
			})
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Queue;