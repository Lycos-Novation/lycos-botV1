const Command = require("../../base/Command.js");

class Emit extends Command {
	constructor(client) {
		super(client, {
			name: "emit",
			description: (language) => language.get("ANSWER_DESCRIPTION"),
			usage: (language, prefix) => language.get("ANSWER_USAGE", prefix),
			examples: (language, prefix) => language.get("ANSWER_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Bot Admin",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
            this.client.emit('rateLimit');
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Emit;
