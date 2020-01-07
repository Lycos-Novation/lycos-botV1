const Command = require("../../base/Command.js");
const moment = require("moment-timezone");
moment.locale('fr');

class RoleInformation extends Command {
	constructor(client) {
		super(client, {
			name: "role-info",
			description: (language) => language.get("ROLE_INFORMATION_DESCRIPTION"),
			usage: (language, prefix) => language.get("ROLE_INFORMATION_USAGE", prefix),
			examples: (language, prefix) => language.get("ROLE_INFORMATION_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
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
				const role = message.guild.roles.get(args[0]) || message.guild.roles.find((r) => r.name.toLowerCase() === args[0].toLowerCase()) || message.mentions.roles.first();
				if (!role) {
					return message.channel.send(message.language.get("ROLE_INFO_NOT_FOUND"))
				}

				return message.channel.send({
					embed: {
						"author": {
							"name": message.language.get("ROLE_INFO_EMBED_NAME", role),
							"icon_url": message.guild.iconURL,
						},
						"color": role.color,
						"fields" : [
							{
								"name" : message.language.get("ROLE_INFO_FIELDS")[0],
								"value" : role.hexColor,
								"inline" : true,
							},
							{
								"name" : message.language.get("ROLE_INFO_FIELDS")[1],
								"value" : role.position,
								"inline" : true,
							},
							{
								"name" : message.language.get("ROLE_INFO_FIELDS")[2],
								"value" : role.mentionable ? "<:valid:536968393367224320>" : "<:nop:536968387956310046>",
								"inline" : true,
							},
							{
								"name" : message.language.get("ROLE_INFO_FIELDS")[3],
								"value" : moment(role.createdTimestamp).format("LLLL"),
								"inline" : true,
							},
						],
						"timestamp": new Date(),
						"footer" : {
							"text" : message.language.get("ROLE_INFO_ID", role),
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
