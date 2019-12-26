const Command = require("../../base/Command.js");

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
			cooldown: 2000,
		});
	}

	async run(message, args) {
		try {
			setTimeout(() => {
				message.delete();
			}, 5000);

			if(!message.member.voice.channel) {
				return message.channel.send("You need to be in a voice channel to play music! ");
			}
			const permissions = message.member.voice.channel.permissionsFor(message.bot.user);
			if (!permissions.has("CONNECT")) {
				return message.channel.send("I cannot connect to your voice channel, make sure I have the require permissions!");
			}
			else if(!permissions.has("SPEAK")) {
				return message.channel.send("I cannot speak in this voice channel, make sure I have the require permissions!");
			}

			const song = args.join(" ");
			if(!song) {
				return message.channel.send("Provide a song to play.");
			}

			if (!message.bot.player.get(message.guild.id)) {
				message.bot.player.join({
					guild: message.guild.id,
					channel: message.member.voice.channel.id,
					host: message.bot.player.nodes.first().host,
				}, { selfdeaf: true });
			}
			await message.bot.lavalink.addSong(message, song);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Play;
