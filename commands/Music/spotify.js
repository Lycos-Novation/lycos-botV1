const Command = require("../../base/Command.js")

class Spotify extends Command {
    constructor(client) {
        super(client, {
            name: "spotify",
            description: (language) => language.get("SPOTIFY_DESCRIPTION"),
            usage: (language, prefix) => language.get("SPOTIFY_USAGE", prefix),
            examples: (language, prefix) => language.get("SPOTIFY_EXAMPLES", prefix),
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
            const song = args[0];
            if (!song) {
                return message.channel.send(message.language.get("SPOTIFY_NO_ARGS"));
            }
            let trackPlaying = message.bot.player.isPlaying(message);
            const matchSpotifyTrackURL = song.match(/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:track\/|\?uri=spotify:track:)((\w|-){22})/)
            const matchSpotifyAlbumURL = song.match(/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:album\/|\?uri=spotify:album:)((\w|-){22})/);
            const matchSpotifyPlaylistURL = song.match(/https?:\/\/(?:embed\.|open\.)(?:spotify\.com\/)(?:playlist\/|\?uri=spotify:playlist:)((\w|-){22})/);
            var track;
            if (matchSpotifyTrackURL) {
                track = song;
            } else if (matchSpotifyAlbumURL) {
                track = song;
                message.channel.send(message.language.get("SPOTIFY_ALBUM_ADDING"))
            } else if (matchSpotifyPlaylistURL) {
                track = song;
                message.channel.send(message.language.get("SPOTIFY_PLAYLIST_ADDING"))
            } else {
                return message.channel.send(message.language.get("NOT_SPOTIFY"))
            }
            
            // If there's already a track being played
            if (trackPlaying) {
                const result = await message.bot.player.addToQueue(message, song, message.author);
                message.channel.send(`\`${result.name}\` ${message.language.get("PLAY_SONG_ADDED")}`);
            } else {
                // Else, play the track
                const result = await message.bot.player.play(message, song);
                if (result.type === 'playlist') {
                    message.channel.send(`${result.tracks.length} ${message.language.get("PLAY_SONGS_ADDED")}.\n${message.language.get("NOWPLAYING")} **${result.tracks[0].name}**!`);
                } else {
                    message.channel.send(`${message.language.get("NOWPLAYING")} \`${result.name}\``);
                }
                message.bot.player.getQueue(message)

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
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = Spotify;
