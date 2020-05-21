const Command = require("../../base/Command.js");

class Restart extends Command {
	constructor(client) {
		super(client, {
			name: "restart",
			description: (language) => language.get("RESTART_DESCRIPTION"),
			usage: (language, prefix) => language.get("RESTART_USAGE", prefix),
			examples: (language, prefix) => language.get("RESTART_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Bot Admin",
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (!args[0]) {
				message.channel.send("Enter a restart option. \`[actual/bot or shards]\`")
			}
			if (args[0] === "all") {
				if (!message.client.shard) return message.channel.send("The bot isn't sharded.");
				message.client.logger.log("All shards are restarting...", "log");
				message.bot.guilds.cache.get("627946609896062986").channels.cache.get("712635877729239081").send("All shards are restarting...");

				try {
					setTimeout(function() {
						message.client.shard.broadcastEval("process.exit(0);");
					}, 1000);
				}
				catch (error) {
					message.bot.guilds.cache.get("627946609896062986").channels.cache.get("712635877729239081").send("Something went wrong while restarting all shards.")
				}
			}
			else if (args[0] === "actual" || args[0] === "bot") {
				if (!message.client.shard) {
					message.client.logger.log(`${message.client.user.username} is restarting...`, "log");
					message.bot.guilds.cache.get("627946609896062986").channels.cache.get("712635877729239081").send(`${message.client.user.username} is restarting...`);
					setTimeout(() => {
						process.exit();
					}, 1000);
				}
				else {
					message.bot.guilds.cache.get("627946609896062986").channels.cache.get("712635877729239081").send(`Shard[#${message.guild.shardID}] is restarting...`);
					setTimeout(() => {
						process.exit(0);
					}, 1000);
				}
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Restart;
