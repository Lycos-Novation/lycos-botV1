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
			botPermissions: ["SEND_MESSAGES", "MANAGE_MESSAGES"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			message.delete().then(m => {
				if (args[0].indexOf("-") !== -1 || args[0].indexOf("0") === 0) {
					return message.channel.send(message.language.get("PURGE_NEGATIVE_OR_NULL"));
				}
				const amount = parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
				if (!amount) {
					return message.channel.send(message.language.get("PURGE_SPECIFY_AMOUNT"))
				}
				else if (amount > 100) {
					return message.channel.send(message.language.get("PURGE_TOO_MUCH_AMOUNT"))
				}
				else {
					message.channel.bulkDelete(amount)
							.then(messages => {
							message.channel.send(`**:wastebasket: | ${messages.size}/${amount} messages supprimés**`)
								.then(msg => msg.delete({
									timeout: 5000, 
									reason: "Purge message - Auto delete"
								}))
							})
					return;
				}
			})
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Purge;
