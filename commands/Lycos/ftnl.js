
const Command = require("../../base/Command.js");

class ftnl extends Command {
	constructor(client) {
		super(client, {
			name: "ftnl",
			description: (language) => language.get("FTNL_DESCRIPTION"),
			usage: (language, prefix) => language.get("FTNL_USAGE", prefix),
			examples: (language, prefix) => language.get("FTNL_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	run(message) {
		try {
			return message.channel.send({
				embed: {
					"author" : {
						"name" : "FTNL",
						"url": "https://haste.ftnl.fr/olokujaqoz.css",
						"icon_url" : "https://cdn.discordapp.com/avatars/370665722780712960/8da435c79f5d75d7800e27e446492d7c.webp?size=512",
					},
					"color": message.config.embed.color,
					"thumbnail": {
						"url" : "https://cdn.discordapp.com/avatars/370665722780712960/8da435c79f5d75d7800e27e446492d7c.webp?size=512",
					},
					"image" : {
						"url" : "https://cdn.discordapp.com/attachments/470288257737949184/635049727108317196/QRCode.png",
					},
                    "timestamp": new Date(),
					"footer" : {
						"text" : message.config.embed.footer,
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

module.exports = ftnl;



