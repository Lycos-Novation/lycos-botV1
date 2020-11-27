const Command = require("../../base/Command.js"), util = require("util");

class Eval extends Command {
	constructor(client) {
		super(client, {
			name: "eval",
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

	async run(message, args) {
		const Beautify = require('beautify');
		var code = args.join(" ");
		try {
			const ev = eval(code);
			let str = util.inspect(ev, {
				depth: 1,
			});

			str = `${str.replace(new RegExp(`${message.bot.token}`, "g"), "nop?")}`;

			if(str.length > 1014) {
				str = str.substr(0, 1014);
				str = str + "...";
			}
			if(code.length > 1014) {
				code = code.substr(0, 1014);
				code = "Message too long to display.";
			}

			message.react("✅");
			let embed = new Discord.MessageEmbed()
			.setColor('#2ecc71')
			.setTitle("Eval")
			.addField("ToEvaluate", `\`\`\`js\n${Beautify(code, { format: "js" })}\n\`\`\``)
			.addField("Evaluated", str)
			.addField("Type of:", typeof(str))
			.setTimestamp()
			.setFooter(`${message.author.tag}`)
			message.channel.send(embed);
		}
		catch (error) {
			message.react("❌");
			let errorembed = new Discord.MessageEmbed()
			.setColor('#e74c3c')
			.addField("\:x: Error!")
			.setDescription(error)
			.setTimestamp()
			.setFooter(`${message.author.tag}`)
			message.channel.send(errorembed);
		}
	}
}

module.exports = Eval;
