const Command = require("../../base/Command.js");

class testMySQL extends Command {
	constructor(client) {
		super(client, {
			name: "testmysql",
			description: (language) => language.get("ANSWER_DESCRIPTION"),
			usage: (language, prefix) => language.get("ANSWER_USAGE", prefix),
			examples: (language, prefix) => language.get("ANSWER_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Bot Admin",
			aliases: ['test'],
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
            if (!message.member.voice.channel) {
				return message.channel.send(message.language.get("PLAY_NO_VOICECHANNEL"))
			}
			const song = args.join(" ");
			if (!song) {
				return message.channel.send(message.language.get("PLAY_NO_ARGS"));
			}
			// Search for tracks
			let tracks = await message.bot.player.searchTracks(song, true);
			if (tracks.length === 0) return message.channel.send(message.language.get("PLAY_NO_TRACK_FOUND"));
			// Sends an embed with the 10 first songs
			if (tracks.length > 10) tracks = tracks.slice(0, 10);
			const embed = new Discord.MessageEmbed()
				.setDescription(tracks.map((t, i) => `**${i + 1} -** ${t.name} | ${t.author}`).join("\n"))
				.setTitle(message.language.get("PLAY_CHOICE"))
				.setFooter(message.language.get("PLAY_CHOICE"))
				.setThumbnail(tracks[0].thumbnail);
			message.channel.send(embed);
			// Wait for user answer
			await message.channel.awaitMessages((m) => m.content > 0 && m.content < 11, { max: 1, time: 20000, errors: ["time"] }).then(async (answers) => {
				let index = parseInt(answers.first().content, 10);
				let track = tracks[index - 1];

				let trackPlaying = message.bot.player.isPlaying(message.guild.id);
				// If there's already a track being played
				if (trackPlaying) {
					const result = await message.bot.player.addToQueue(message.guild.id, track, message.author);
					console.log(result);
					if (result.type === 'playlist') {
						message.channel.send(`${result.tracks.length} ${message.language.get("PLAY_SONGS_ADDED")}.`);
					} else {
						message.channel.send(`\`${result.name}\` ${message.language.get("PLAY_SONG_ADDED")}`);
					}
				} else {
					// Else, play the track
					const result = await message.bot.player.play(message.member.voice.channel, track, message.author);
					console.log(result);
					if (result.type === 'playlist') {
						message.channel.send(`${result.tracks.length} ${message.language.get("PLAY_SONGS_ADDED")}.\n${message.language.get("NOWPLAYING")} **${result.tracks[0].name}**!`);
					} else {
						message.channel.send(`${message.language.get("NOWPLAYING")} \`${result.name}\``);
					}
					message.bot.player.getQueue(message.guild.id)

						//Events
						.on('end', () => {
							message.channel.send(message.language.get("PLAY_END"));
						})
						.on('trackChanged', (oldTrack, newTrack, skipped, repeatMode) => {
							if (skipped) message.channel.send(message.language.get("PLAY_SKIPPED", oldTrack.name));
							if (repeatMode) {
								message.channel.send(message.language.get(`PLAY_AGAIN`, newTrack.name));
							} else {
								message.channel.send(`${message.language.get("PLAY_NEWPLAY", newTrack.name)}`);
							}
						})
						.on('channelEmpty', () => {
							message.channel.send(message.language.get("PLAY_CHANNEL_EMPTY"));
						});
				}
			});
		} catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = testMySQL;
