const Command = require("../../base/Command.js");

class Say extends Command {
	constructor(client) {
		super(client, {
			name: "say",
			description: (language) => language.get("SAY_DESCRIPTION"),
			usage: (language, prefix) => language.get("SAY_USAGE", prefix),
			examples: (language, prefix) => language.get("SAY_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Moderator",
			botPermissions: ["SEND_MESSAGES"],
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
            if (say.indexOf("@everyone") !== -1 && !message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send(message.language.get("SAY_EVERYONE"));
            message.delete();
            if (message.attachments.size <= 0) {
                return message.channel.send(say);
              } else {
                return message.channel.send(say, {files: [message.attachments.first().url]});
              }
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Say;
