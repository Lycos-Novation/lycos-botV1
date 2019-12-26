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
			if (!args || args.length < 1) return message.channel.send("You must provide a command to reload.");
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
				if (response) return message.channel.send(`Error Unloading: ${response}`);

				response = message.bot._loadCommand(path, commandName);
				if (response) return message.channel.send(`Error Loading: ${response}`);

				return message.channel.send(`The command \`${commandName}\` has been reloaded`);
			}
			else {
				return message.channel.send(`The command \`${args[0]}\` doesn't seem to exist. Try again!`);
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Reload;
