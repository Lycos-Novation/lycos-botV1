const Command = require("../../base/Command.js");

class Purge extends Command {
	constructor(client) {
		super(client, {
			name: "purge",
			description: (language) => language.get("PURGE_DESCRIPTION"),
			usage: (language, prefix) => language.get("PURGE_USAGE", prefix),
			examples: (language, prefix) => language.get("PURGE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Moderator",
			botPermissions: ["MANAGE_MESSAGES"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			const amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
			if (!amount) {
				return message.channel.send(message.language.get("PURGE_SPECIFY_AMOUNT"))
			}
			else if (amount > 100) {
				return message.channel.send(message.language.get("PURGE_TOO_MUCH_AMOUNT"))
			}
			else {
				message.delete().then(message.channel.bulkDelete(amount).then(messages => {
					message.channel.send(`**:wastebasket: | ${messages.size}/${amount} messages supprimés**`).then(msg => msg.delete(5000))
				})
				)
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Purge;
