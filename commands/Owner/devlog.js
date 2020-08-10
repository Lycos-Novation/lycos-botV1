const Command = require("../../base/Command.js")
const {version} = require("../../package.json");
class DevLog extends Command {
	constructor(client) {
		super(client, {
			name: "devlog",
			description: (language) => language.get("AUTONICK_DESCRIPTION"),
			usage: (language, prefix) => language.get("AUTONICK_USAGE", prefix),
			examples: (language, prefix) => language.get("AUTONICK_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "Bot Admin",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: true,
			cooldown: 1000,
		});
	}

	run(message, args) {
		try {
            let dlogs = args.slice(1).join(" ");
            let method = args[0];
            if (!method) {
                return message.channel.send("Précise quels changement tu veux annoncer : ``add``, ``update`` ou ``remove`` ?")
            }
            if (method === "add"){
                var couleur = 0x1EF121;
            } else if (method === "update"){
                couleur = 0xF5870A;
            } else if (method === "remove"){
                couleur = 0xF40C0C;
            } else {
                return message.channel.send("Je n'ai pas compris ce que tu voulais annoncer...")
            }
            if (!dlogs) {
                return message.channel.send("T'as oublié quelque chose je crois c:")
            }
            let chan = this.client.guilds.cache.find(g => g.id === "697368051405815860").channels.cache.find(c => c.id === '740500133921423440');
            if(!chan) {
                return message.channel.send(`Salon d'annonce introuvable`)
            }
            return chan.send({
                embed: {
                    color: couleur,
                    footer: {
                        text: message.config.embed.footer + " - Do update command to see this in another language from everywhere the bot is."
                    },
                    title: `Notes de mise à jour | Version ${version}`,
                    description: dlogs,
                }
            });
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = DevLog;
