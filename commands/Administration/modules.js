const Command = require("../../base/Command.js");
const modules = ["nsfw", "nsfw-hentai"];
const booleanOptions = [true, false];
const options = ["on", "off"];

class Modules extends Command {
	constructor(client) {
		super(client, {
			name: "modules",
			description: (language) => language.get("MODULES_DESCRIPTION"),
			usage: (language, prefix) => language.get("MODULES_USAGE", prefix),
			examples: (language, prefix) => language.get("MODULES_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "Server Admin",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if (!args[0]) {
				return message.channel.send(message.language.get("MODULES_INFO", message.settings.prefix));
			}
			if (args[0] === "list") {
				return message.channel.send(`Here is the list of available modules:\n> \`${modules.join("\`, \`")}\``);
			}
			if (args[0] === "set") {
				if(!args[1]) {
					return message.channel.send(message.language.get("MODULES_NULL"))
				}
				else if (modules.includes(args[1].toLowerCase())) {
					if (args[2].toLowerCase() === "on" && booleanOptions[options.indexOf(args[2].toLowerCase())] === message.settings.modules[args[1].toLowerCase()]) {
						return message.channel.send(message.language.get("MODULES_ALREADY_ACTIVATED"))
					}
					else if (args[2].toLowerCase() === "off" && booleanOptions[options.indexOf(args[2].toLowerCase())] === message.settings.modules[args[1].toLowerCase()]) {
						return message.channel.send(message.language.get("MODULES_ALREADY_DEACTIVATED"))
					}
					else {
						if (!message.bot.guildsData.has(message.guild.id)) {message.bot.guildsData.set(message.guild.id, {});}
						if (args[1].toLowerCase() === "games") {
							const getData = message.settings;
							getData.modules.games = booleanOptions[options.indexOf(args[2].toLowerCase())];
							message.bot.guildsData.set(message.guild.id, getData);

							if (args[2] === "on") {
								return message.channel.send(message.language.get("MODULES_ACTIVATED", args));
							}
							else if (args[2] === "off") {
								return message.channel.send(message.language.get("MODULES_DEACTIVATED", args));
							}
						}

						if (args[1].toLowerCase() === "nsfw") {
							const getData = message.settings;
							getData.modules.nsfw = booleanOptions[options.indexOf(args[2].toLowerCase())];
							message.bot.guildsData.set(message.guild.id, getData);

							if (args[2] === "on") {
								return message.channel.send(message.language.get("MODULES_ACTIVATED", args));
							}
							else if (args[2] === "off") {
								return message.channel.send(message.language.get("MODULES_DEACTIVATED", args));
							}
						}

						if (args[1].toLowerCase() === "nsfw-hentai") {
							const getData = message.settings;
							getData.modules.nsfwHentai = booleanOptions[options.indexOf(args[2].toLowerCase())];
							message.bot.guildsData.set(message.guild.id, getData);

							if (args[2] === "on") {
								return message.channel.send(message.language.get("MODULES_ACTIVATED", args));
							}
							else if (args[2] === "off") {
								return message.channel.send(message.language.get("MODULES_DEACTIVATED", args));
							}
						}
					}
				}
				else {
					return message.channel.send(message.language.get("ERROR_MODULES_INCORRECT", message.settings.prefix));
				}
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Modules;
