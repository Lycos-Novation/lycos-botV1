const Command = require("../../base/Command.js");

class ServerInformation extends Command {
	constructor(client) {
		super(client, {
			name: "server-info",
			description: (language) => language.get("SERVERINFO_DESCRIPTION"),
			usage: (language, prefix) => language.get("SERVERINFO_USAGE", prefix),
			examples: (language, prefix) => language.get("SERVERINFO_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["serverinfo", "si", "servinfo"],
			botPermissions: ["SEND_MESSAGES"],
			nsfw: false,
		});
	}

	run(message) {
		try {
			const verificationLevels = {
				"NONE": "None",
				"LOW": "Low",
				"MEDIUM": "Medium",
				"HIGH": "(╯°□°）╯︵  ┻━┻",
				"VERY_HIGH": "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻",
			};
			const regions = {
				"brazil": message.language.get("SERVERINFO_REGIONS")[0],
				"eu-central": message.language.get("SERVERINFO_REGIONS")[1],
				"singapore": message.language.get("SERVERINFO_REGIONS")[2],
				"us-central": message.language.get("SERVERINFO_REGIONS")[3],
				"sydney": message.language.get("SERVERINFO_REGIONS")[4],
				"us-east": message.language.get("SERVERINFO_REGIONS")[5],
				"us-south": message.language.get("SERVERINFO_REGIONS")[6],
				"us-west": message.language.get("SERVERINFO_REGIONS")[7],
				"eu-west": message.language.get("SERVERINFO_REGIONS")[8],
				"vip-us-east": message.language.get("SERVERINFO_REGIONS")[9],
				"london": message.language.get("SERVERINFO_REGIONS")[10],
				"amsterdam": message.language.get("SERVERINFO_REGIONS")[11],
				"hongkong": message.language.get("SERVERINFO_REGIONS")[12],
				"russia": message.language.get("SERVERINFO_REGIONS")[13],
				"southafrica": message.language.get("SERVERINFO_REGIONS")[14],
				"europe": message.language.get("SERVERINFO_REGIONS")[15],
			};
			return message.channel.send({
				embed: {
					color: message.config.embed.color,
					author: {
						name: message.language.get("SERVERINFO_PROFIL", message.guild.name),
						icon_url: message.guild.iconURL({ format: "png", dynamic: true })
					},
					thumbnail: {
						url: message.guild.iconURL({ format: "png", dynamic: true})
					},
					fields: [{
						name: message.language.get("SERVERINFO_TITLES")[0],
						value: message.guild.name,
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[1],
						value: message.language.get("SERVERINFO_CDATE", message),
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[2],
						value: `${message.guild.members.cache.size} | ${message.guild.members.cache.filter((member) => !member.user.bot).size} | ${message.guild.members.cache.filter((member) => member.user.bot).size}`,
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[3],
						value: message.guild.channels.cache.size,
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[4],
						value: message.guild.id,
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[5],
						value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[6],
						value: regions[message.guild.region],
						inline: true,
					},
					{
						name: message.language.get("SERVERINFO_TITLES")[7],
						value: verificationLevels[message.guild.verificationLevel],
						inline: true,
					},
					{
						name : message.language.get("SERVERINFO_TITLES")[8],
						value : message.guild.roles.cache.size > 10 ? `${message.guild.roles.cache.sort(function compareNombres(a, b) {
							return b.position - a.position;
						  }).map((r) => r).slice(0, 9).join(", ")} ${message.language.get("SERVERINFO_ROLELIST", message.guild)}` : (message.guild.roles.cache.size < 1) ? `${message.language.get("SERVERINFO_NOROLES")}` : `${message.guild.roles.cache.sort(function compareNombres(a, b) {
							return b.position - a.position;
						  }).map((r) => r).join(", ")}`
					},
					],
					timestamp: new Date(),
					footer: {
						text: message.config.embed.footer,
					},
				},
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = ServerInformation;
