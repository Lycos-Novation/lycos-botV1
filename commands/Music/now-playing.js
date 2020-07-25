const Command = require("../../base/Command.js");

class NowPlaying extends Command {
	constructor(client) {
		super(client, {
			name: "now-playing",
			description: (language) => language.get("NOWPLAYING_DESCRIPTION"),
			usage: (language, prefix) => language.get("NOWPLAYING_USAGE", prefix),
			examples: (language, prefix) => language.get("NOWPLAYING_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["np", "nowplaying"],
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message) {
		try {
			let trackPlaying = message.bot.player.isPlaying(message.guild.id);
			if (!trackPlaying) {
				return message.channel.send(message.language.get("NOT_PLAYING"));
			}
			let track = await message.bot.player.nowPlaying(message.guild.id);
			return message.channel.send({
				embed: {
					title: message.language.get("NOWPLAYING"),
					url: track.url,
					thumbnail: {
						url: track.thumbnail,

					},
					fields: [
						{
							name: message.language.get("NOWPLAYING_MUSIC_NAME"),
							value: track.name
						},
						{
							name: message.language.get("NOWPLAYING_ARTIST"),
							value: track.author
						},
						{
							name: message.language.get("NOWPLAYING_MUSIC_DURATION"),
							value: track.duration
						},
						{
							name: message.language.get("NOWPLAYING_PROGRESS_BAR"),
							value: message.bot.player.createProgressBar(message.guild.id)
						}
					],
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
