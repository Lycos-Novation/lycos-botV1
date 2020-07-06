const Command = require("../../base/Command.js");

class Vote extends Command {
	constructor(client) {
		super(client, {
			name: "vote",
			description: (language) => language.get("VOTE_DESCRIPTION"),
			usage: (language, prefix) => language.get("VOTE_USAGE", prefix),
			examples: (language, prefix) => language.get("VOTE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [],
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					color: message.config.embed.color,
					title: message.language.get("VOTE_TITLE"),
					description: message.language.get("VOTE_DESC"),
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Vote;
