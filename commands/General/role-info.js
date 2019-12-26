const Command = require("../../base/Command.js");
const moment = require("moment");

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
				return message.channel.send("Please specify a role.")
			}
			else {
				const role = message.guild.roles.get(args[0]) || message.guild.roles.find((r) => r.name.toLowerCase() === args[0].toLowerCase()) || message.mentions.roles.first();
				if (!role) {
					return message.channel.send("I can't find this role.");
				}

				return message.channel.send({
					embed: {
						"author": {
							"name": `Information about ${role.name} (Role)`,
							"icon_url": message.guild.iconURL(),
						},
						"color": role.hexColor,
						"fields" : [
							{
								"name" : "Color",
								"value" : role.hexColor,
								"inline" : true,
							},
							{
								"name" : "Position",
								"value" : role.position,
								"inline" : true,
							},
							{
								"name" : "Mentionable",
								"value" : role.mentionable ? "<:valid:536968393367224320>" : "<:nop:536968387956310046>",
								"inline" : true,
							},
							{
								"name" : "Created on the",
								"value" : moment(role.createdTimestamp).format("DD/MM/YY, HH:mm:ss"),
								"inline" : true,
							},
						],
						"timestamp": new Date(),
						"footer" : {
							"text" : `Role ID: ${role.id}`,
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
