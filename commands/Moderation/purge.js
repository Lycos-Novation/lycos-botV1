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
				return message.channel.send("Must specify an amount to delete!");
			}
			else if (amount > 100) {
				return message.channel.send("I can't delete more than 100 messages.");
			}
			else {
				message.channel.messages.fetch({ limit: amount }).then((messages) => {
					message.channel.bulkDelete(messages).then(() => {
						message.channel.send(`\`${messages.size}\` message${messages.size > 1 ? "s" : ""} deleted.`).then((msg) => {
							setTimeout(() => {
								msg.delete();
							}, 5000);
						});
					}).catch((error) => console.log(error));
				});
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Purge;
