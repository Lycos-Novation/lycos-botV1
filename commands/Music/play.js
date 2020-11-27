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

			await message.bot.player.play(message, song);

		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Play;
