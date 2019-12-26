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

	run(message, args) {
		const code = args.join(" ");
		try {
			const ev = eval(code);
			let str = util.inspect(ev, {
				depth: 1,
			});

			str = `${str.replace(new RegExp(`${message.bot.token}`, "g"), "nop?")}`;

			if(str.length > 1900) {
				str = str.substr(0, 1900);
				str = str + "...";
			}

			message.react("✅");
			message.channel.send(`\`\`\`${str}\`\`\``);
		}
		catch (error) {
			message.react("❌");
			message.channel.send(`\`\`\`${error}\`\`\``);
		}
	}
}

module.exports = Eval;
