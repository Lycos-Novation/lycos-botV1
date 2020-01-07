const Command = require("../../base/Command.js");

class Reload extends Command {
	constructor(client) {
		super(client, {
			name: "reload",
			description: (language) => language.get("RELOAD_DESCRIPTION"),
			usage: (language, prefix) => language.get("RELOAD_USAGE", prefix),
			examples: (language, prefix) => language.get("RELOAD_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "Bot Admin",
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	async run(message, args) {
		try {
			if (!args || args.length < 1) return message.channel.send(message.language.get("RELOAD_NO_COMMAND"));
			let path;
			let commandName;
			if (message.bot.commands && message.bot.commands.has(args[0]) || message.bot.commands.get(message.bot.aliases.get(args[0]))) {
				if (message.bot.commands.has(args[0])) {
					commandName = message.bot.commands.get(args[0]).help.name;
					path = message.bot.commands.get(args[0]).conf.location;
				}
				else if (message.client.aliases.has(args[0])) {
					commandName = message.bot.commands.get(message.bot.aliases.get(args[0])).help.name;
					path = message.bot.commands.get(message.bot.aliases.get(args[0])).conf.location;
				}

				let response = await message.bot._unloadCommand(path, commandName);
				if (response) return message.channel.send(message.language.get("RELOAD_ERROR_UNLOADING", response));

				response = message.bot._loadCommand(path, commandName);
				if (response) return message.channel.send(message.language.get("RELOAD_ERROR_LOADING", response));

				return message.channel.send(message.language.get("RELOAD_COMMAND_RELOADED", commandName));
			}
			else {
				return message.channel.send(message.language.get("RELOAD_COMMAND_DOESNT_EXIST", args));
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Reload;
