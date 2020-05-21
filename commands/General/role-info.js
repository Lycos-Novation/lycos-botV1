const Command = require("../../base/Command.js");

class RoleInformation extends Command {
	constructor(client) {
		super(client, {
			name: "role-info",
			description: (language) => language.get("ROLE_INFO_DESCRIPTION"),
			usage: (language, prefix) => language.get("ROLE_INFO_USAGE", prefix),
			examples: (language, prefix) => language.get("ROLE_INFO_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			aliases: ["rinfo", "r-info", "roleinfo", "ri"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
			if(!args[0]) {
				return message.channel.send(message.language.get("ROLE_INFO_SPECIFY"))
			}
			else {
				const role = message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find((r) => r.name.toLowerCase() === args[0].toLowerCase()) || message.mentions.roles.first();
				if (!role) {
					return message.channel.send(message.language.get("ROLE_INFO_NOT_FOUND"))
				}

				return message.channel.send({
					embed: {
						author: {
							name: message.language.get("ROLE_INFO_EMBED_NAME", role),
							icon_url: message.guild.iconURL({ format: "png", dynamic: true })
						},
						color: role.color,
						fields: [
							{
								name: message.language.get("ROLE_INFO_FIELDS")[0],
								value: role.hexColor,
								inline: true,
							},
							{
								name: message.language.get("ROLE_INFO_FIELDS")[1],
								value: role.position,
								inline: true,
							},
							{
								name: message.language.get("ROLE_INFO_FIELDS")[2],
								value: role.mentionable ? "<:lycosV:631854492173991947>" : "<:lycosX:631854509798326322>",
								inline: true,
							},
							{
								name: message.language.get("ROLE_INFO_FIELDS")[3],
								value: message.language.get("ROLE_INFO_CDATE", role, message),
								inline: true,
							},
						],
						timestamp: new Date(),
						footer: {
							text: message.language.get("ROLE_INFO_ID", role),
						},
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

module.exports = RoleInformation;
