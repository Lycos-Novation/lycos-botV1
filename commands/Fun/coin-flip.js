const Command = require("../../base/Command.js");

class CoinFlip extends Command {
	constructor(client) {
		super(client, {
			name: "coin-flip",
			description: (language) => language.get("FLIP_DESCRIPTION"),
			usage: (language, prefix) => language.get("FLIP_USAGE", prefix),
			examples: (language, prefix) => language.get("FLIP_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["flip", "coin", "coinflip", "flipcoin"],
			permLevel: "User",
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			if (Math.random() < 0.5) {
				message.channel.send(message.language.get("FLIP_TAILS"))
			}
			else {
				message.channel.send(message.language.get("FLIP_HEADS"))
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = CoinFlip;
