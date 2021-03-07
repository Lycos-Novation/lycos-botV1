const Command = require("../../base/Command.js");

class Informations extends Command {
	constructor(client) {
		super(client, {
			name: "informations",
			description: (language) => language.get("INFO_DESCRIPTION"),
			usage: (language, prefix) => language.get("INFO_USAGE", prefix),
			examples: (language, prefix) => language.get("INFO_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["informations", "info"],
			permLevel: "User",
			botPermissions: ["SEND_MESSAGES"],
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					color: message.config.embed.color,
					title: message.language.get("INFO_TITLE"),
					description: message.language.get("INFO_DESC"),
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Informations;
