const Command = require("../../base/Command.js");

class Help extends Command {
	constructor(client) {
		super(client, {
			name: "help",
			description: (language) => language.get("HELP_DESCRIPTION"),
			usage: (language, prefix) => language.get("HELP_USAGE", prefix),
			examples: (language, prefix) => language.get("HELP_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["aide"],
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 5000,
		});
	}

	run(message, args) {
		try {
			if(args[0]) {
				const command = message.bot.commands.get(args[0]) || message.bot.commands.get(message.bot.aliases.get(args[0]));
				if(command) {
					return message.channel.send({
						embed: {
							author: {
								name: message.language.get("HELP_TITLE", command.help.name),
								icon_url: message.bot.user.displayAvatarURL
							},
							color: message.config.embed.color,
							footer: {
								text: message.config.embed.footer
							},
							fields: [
								{
									name: message.language.get("HELP_FIELDS")[0],
									value: command.help.description(message.language),
								},
								{
									name: message.language.get("HELP_FIELDS")[1],
									value: command.help.usage(message.language, message.settings.prefix),
								},
								{
									name: message.language.get("HELP_FIELDS")[2],
									value: command.help.examples(message.language, message.settings.prefix),
								},
								{
									name: "Aliases",
									value: command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "none",
								},
								{
									name: message.language.get("HELP_FIELDS")[3],
									value: `${message.config.permLevels.find((p) => p.name === command.conf.permLevel).level} (${command.conf.permLevel})`,
								},
							],
						},
					});
				}
				else {
					return message.channel.send(message.language.get("HELP_NOT_FOUND", args[0]));
				}
			}
			else {
				const embedFields = [];

				embedFields.push(
					{
						name: `${message.config.emotes.administration} ${message.language.get("HELPGLOBAL_FIELDS")[0]} (${message.bot.commands.filter((filters) => filters.help.category === "Administration").size})`,
						value: message.bot.commands.filter((filters) => filters.help.category === "Administration").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
					},
					{
						name: `${message.config.emotes.lycos} ${message.language.get("HELPGLOBAL_FIELDS")[1]} (${message.bot.commands.filter((filters) => filters.help.category === "Lycos").size})`,
						value: message.bot.commands.filter((filters) => filters.help.category === "Lycos").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
					},
					{
						name: `${message.config.emotes.fun} ${message.language.get("HELPGLOBAL_FIELDS")[2]} (${message.bot.commands.filter((filters) => filters.help.category === "Fun").size})`,
						value: message.bot.commands.filter((filters) => filters.help.category === "Fun").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
					},
					{
						name: `${message.config.emotes.general} ${message.language.get("HELPGLOBAL_FIELDS")[3]} (${message.bot.commands.filter((filters) => filters.help.category === "General").size})`,
						value: message.bot.commands.filter((filters) => filters.help.category === "General").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
					},
					{
						name: `${message.config.emotes.moderation} ${message.language.get("HELPGLOBAL_FIELDS")[4]} (${message.bot.commands.filter((filters) => filters.help.category === "Moderation").size})`,
						value: message.bot.commands.filter((filters) => filters.help.category === "Moderation").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
					},
					{
						name: `${message.config.emotes.music} ${message.language.get("HELPGLOBAL_FIELDS")[5]} (${message.bot.commands.filter((filters) => filters.help.category === "Music").size})`,
						value: message.bot.commands.filter((filters) => filters.help.category === "Music").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
					},
				);

				if (message.settings.modules.nsfw) {
					embedFields.push(
						{
							name: `${message.config.emotes.nsfw} NSFW (${message.bot.commands.filter((filters) => filters.help.category === "NSFW").size})`,
							value: message.bot.commands.filter((filters) => filters.help.category === "NSFW").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
						}
					);
				}
				if (message.settings.modules.nsfwHentai) {
					embedFields.push(
						{
							name: `${message.config.emotes.nsfw} Hentai-Ecchi (${message.bot.commands.filter((filters) => filters.help.category === "Hentai").size})`,
							value: message.bot.commands.filter((filters) => filters.help.category === "Hentai").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
						}
					);
				}

				if (message.config.administrators.includes(message.author.id)) {
					embedFields.push(
						{
							name: `Owner's Commands (${message.bot.commands.filter((filters) => filters.help.category === "Owner").size})`,
							value: message.bot.commands.filter((filters) => filters.help.category === "Owner").map((name) => name.help.name).map((name) => `\`${name}\``).join(", "),
						}
					);
				}

				return message.channel.send({
					embed: {
						author : {
							name :  message.language.get("HELPGLOBAL_TITLE"),
							icon_url: message.bot.user.displayAvatarURL
						},
						color: message.config.embed.color,
						thumbnail: {
							url: message.bot.user.displayAvatarURL
						},
						description: message.language.get("HELP_EMBED_DESCRIPTION", message),
						footer: {
							text: message.config.embed.footer, icon_url: message.bot.user.displayAvatarURL
						},
						fields: embedFields,
					},
				});
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Help;
