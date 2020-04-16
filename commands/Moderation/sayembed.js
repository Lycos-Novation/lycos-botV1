const Command = require("../../base/Command.js");

class Sayembed extends Command {
	constructor(client) {
		super(client, {
			name: "sayembed",
			description: (language) => language.get("BAN_DESCRIPTION"),
			usage: (language, prefix) => language.get("BAN_USAGE", prefix),
			examples: (language, prefix) => language.get("BAN_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "Server Moderator",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["sembed", "saye"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	async run(message, args) {
		try {
			let say = args.join(" ");
            if (!say) return message.reply(message.language.get("SAY_NO_ARGS"));
            if (say.length > 1995) return message.reply(message.language.get("SAY_TOO_LONG"));
            message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        description: say
                    }
				});
				return message.delete();
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Sayembed;
