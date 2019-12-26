const Command = require("../../base/Command.js");

class RPS extends Command {
	constructor(client) {
		super(client, {
			name: "rock-paper-scissors",
			description: (language) => language.get("RPS_DESCRIPTION"),
			usage: (language, prefix) => language.get("RPS_USAGE", prefix),
			examples: (language, prefix) => language.get("RPS_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: false,
			guildOnly: false,
			aliases: ["rps", "pierre-feuille-ciseaux", "pfc"],
			permLevel: "User",
			botPermissions: [],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (args.length >= 1) {
				var choices = ["pierre", "feuille", "ciseau"];
				var choixJ = args[0].toLowerCase();
				if (choices.includes(choixJ)) {
					var choixO = choices[Math.floor(Math.random() * choices.length)];
					var result;
					if (choixO === choixJ) {
						result = 0;
				  	} else if ((choixO === "pierre" && choixJ === "ciseau") || (choixO === "feuille" && choixJ === "pierre") || (choixO === "ciseau" && choixJ === "feuille")) {
						result = -1;
				  	} else {
						result = 1;
				  	}
				  	message.channel.send("Choix de Denver : " + choixO);
				  	if (result === 0) {
						message.channel.send(":flag_white: | Match nul !");
					}
					else if (result === 1) {
						message.channel.send(":dagger: | Victoire de " + message.author.username + " !");
				  	}
				  	else {
						message.channel.send(":skull_crossbones: | Victoire de Denver !");
				  	}
				}
				else {
				  errors.run(client, message, "Choisissez entre 'pierre', 'feuille', 'ciseau'");
				}
			} else {
				errors.run(client, message, "Choisissez entre 'pierre', 'feuille', 'ciseau'");
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = RPS;
