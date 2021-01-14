const Command = require("../../base/Command.js");
const fetch = require("node-fetch");
class test extends Command {
	constructor(client) {
		super(client, {
			name: "test",
			description: (language) => language.get("ANSWER_DESCRIPTION"),
			usage: (language, prefix) => language.get("ANSWER_USAGE", prefix),
			examples: (language, prefix) => language.get("ANSWER_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Bot Admin",
			aliases: [],
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			cooldown: 30000,
		});
	}

	async run(message, args) {
		try {
			const test = await message.channel.messages.fetch('799336367359393853')
			console.log(test)
		} catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = test;
