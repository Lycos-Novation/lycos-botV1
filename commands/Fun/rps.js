const Command = require("../../base/Command.js");

class RPS extends Command {
	constructor(client) {
		super(client, {
			name: "rock-paper-scissors",
			description: (language) => language.get("RPS_DESCRIPTION"),
			usage: (language, prefix) => language.get("RPS_USAGE", prefix),
			examples: (language, prefix) => language.get("RPS_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["rps", "pierre-feuille-ciseaux", "pfc"],
			permLevel: "User",
			botPermissions: ["SEND_MESSAGES"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (args.length >= 1) {
				var choices = message.language.get("RPS_CHOICES_ARRAY");
				var choixJ = args[0].toLowerCase();
				if (choices.includes(choixJ)) {
					var choixO = choices[Math.floor(Math.random() * choices.length)];
					var result;
					if (choixO === choixJ) {
						result = 0;
				  	} else if ((choixO === message.language.get("RPS_ROCK") && choixJ === message.language.get("RPS_SCISSORS")) || (choixO === message.language.get("RPS_PAPER") && choixJ === message.language.get("RPS_ROCK")) || (choixO === message.language.get("RPS_SCISSORS") && choixJ === message.language.get("RPS_PAPER"))) {
						result = 2;
				  	} else {
						result = 1;
				  	}
				  	message.channel.send(message.language.get("RPS_LYCOS_CHOICE", choixO));
				  	if (result === 0) {
						message.channel.send(message.language.get("RPS_MATCH_EQUAL"));
					}
					else if (result === 1) {
						message.channel.send(message.language.get("RPS_PLAYER_WIN", message));
				  	}
				  	else {
						message.channel.send(message.language.get("RPS_LYCOS_WIN"));
				  	}
				}
				else {
				  message.channel.send(message.language.get("RPS_CHOICES"));
				}
			} else {
				message.channel.send(message.language.get("RPS_CHOICES"));
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = RPS;
