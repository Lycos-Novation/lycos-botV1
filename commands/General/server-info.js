const Command = require("../../base/Command.js");

class ServerInformation extends Command {
	constructor(client) {
		super(client, {
			name: "server-info",
			description: (language) => language.get("SERVERINFO_DESCRIPTION"),
			usage: (language) => language.get("SERVERINFO_USAGE"),
			examples: (language) => language.get("SERVERINFO_EXAMPLES"),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: ["serverinfo", "si"],
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
		});
	}

	run(message) {
		try {
			const verificationLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
			const region = {
				"brazil": ":flag_br: Brazil",
				"eu-central": ":flag_eu: Central Europe",
				"singapore": ":flag_sg: Singapore",
				"us-central": ":flag_us: U.S. Central",
				"sydney": ":flag_au: Sydney",
				"us-east": ":flag_us: U.S. East",
				"us-south": ":flag_us: U.S. South",
				"us-west": ":flag_us: U.S. West",
				"eu-west": ":flag_eu: Western Europe",
				"vip-us-east": ":flag_us: VIP U.S. East",
				"london": ":flag_gb: London",
				"amsterdam": ":flag_nl: Amsterdam",
				"hongkong": ":flag_hk: Hong Kong",
				"russia": ":flag_ru: Russia",
				"southafrica": ":flag_za:  South Africa",
			};
			return message.channel.send({
				embed: {
					"color": message.config.embed.color,
					"author": {
						"name": message.language.get("SERVERINFO_PROFIL"),
						"icon_url": message.guild.iconURL(),
					},
					"thumbnail": {
						"url": message.guild.iconURL({ format: "png" }),
					},
					"fields": [{
						"name": message.language.get("SERVERINFO_TITLES")[0],
						"value": message.guild.name,
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[1],
						"value": `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${message.bot.functions.checkDays(message.channel.guild.createdAt)}`,
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[2],
						"value": `${message.guild.members.size} | ${message.guild.members.filter((member) => !member.user.bot).size} | ${message.guild.members.filter((member) => member.user.bot).size}`,
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[3],
						"value": message.guild.channels.size,
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[4],
						"value": message.guild.id,
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[5],
						"value": `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`,
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[6],
						"value": region[message.guild.region],
						"inline": true,
					},
					{
						"name": message.language.get("SERVERINFO_TITLES")[7],
						"value": verificationLevels[message.guild.verificationLevel],
						"inline": true,
					},
					],
					"timestamp": new Date(),
					"footer": {
						"text": message.config.embed.footer,
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
