const Command = require("../../base/Command.js");

class Volume extends Command {
	constructor(client) {
		super(client, {
			name: "volume",
			description: (language) => language.get("VOLUME_DESCRIPTION"),
			usage: (language, prefix) => language.get("VOLUME_USAGE", prefix),
			examples: (language, prefix) => language.get("VOLUME_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			cooldown: 2000,
		});
	}

	async run(message, args) {
		try {
			if (!message.bot.player.get(message.guild.id)) {
				return message.channel.send("I'm not connected to any voice channel.");
			}
			if(!message.member.voice.channel) {
				return message.channel.send("You need to be in a voice channel to play music! ");
			}

			const volume = args.join(" ");
			const player = message.bot.player.get(message.guild.id);
			if (!player) { return message.channel.send("There is nothing playing now."); }
			if (!volume || isNaN(volume)) { return message.channel.send("The volume must be between 1 and 100%."); }
			else if (volume <= 0 || volume > 100) { return message.channel.send("The volume must be between 1 and 100%."); }

			const playerVolume = await player.volume(volume);
			return message.channel.send(`🔊 Volume has been set to \`${playerVolume.state.volume}%\`.`);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Volume;
