const Command = require("../../base/Command.js"),
ytpl = require("ytpl");

class Play extends Command {
	constructor(client) {
		super(client, {
			name: "play",
			description: (language) => language.get("PLAY_DESCRIPTION"),
			usage: (language, prefix) => language.get("PLAY_USAGE", prefix),
			examples: (language, prefix) => language.get("PLAY_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			permissions: ["CONNECT", "SPEAK", "SEND_MESSAGES"],
			cooldown: 5000,
		});
	}

	async run(message, args) {
		try {
			if (!message.member.voice.channel) return message.channel.send(message.language.get("PLAY_NO_VOICECHANNEL"));
			const song = args.join(" ");
			if (!song) {
				return message.channel.send(message.language.get("PLAY_NO_ARGS"));
			}
			const matchSpotifyTrackURL = song.match(/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/)
            const matchSpotifyAlbumURL = song.match(/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/);
			const matchSpotifyPlaylistURL = song.match(/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/);
			const matchYoutubeURL = song.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
            var track;
            if (matchSpotifyTrackURL) {
                track = song;
            } else if (matchSpotifyAlbumURL) {
                track = song;
                message.channel.send(message.language.get("SPOTIFY_ALBUM_ADDING"))
            } else if (matchSpotifyPlaylistURL) {
                track = song;
                message.channel.send(message.language.get("SPOTIFY_PLAYLIST_ADDING"))
            } else if (matchYoutubeURL) {
                track = song;
            } else if (ytpl.validateURL(song)) {
                track = song;
                message.channel.send(message.language.get("SPOTIFY_PLAYLIST_ADDING"))
            } else {
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
				await message.channel.awaitMessages((m) => m.content > 0 && m.content < 11, { max: 1, time: 20000, errors: ["time"] })
				.then(async (answers) => {
					let index = parseInt(answers.first().content, 10);
					track = tracks[index - 1];
				})
				.catch((e) => console.log(e));
			}

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

		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Play;
