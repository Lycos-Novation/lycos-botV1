const Command = require("../../base/Command.js");

class Kick extends Command {
	constructor(client) {
		super(client, {
			name: "kick",
			description: (language) => language.get("KICK_DESCRIPTION"),
			usage: (language, prefix) => language.get("KICK_USAGE", prefix),
			examples: (language, prefix) => language.get("KICK_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "Server Moderator",
			botPermissions: ["EMBED_LINKS", "KICK_MEMBERS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	async run(message, args) {
		try {
			const searchArgs = args.join(" ");
			if (!searchArgs) {
				return message.reply(`<:false:470303149077299231> ${message.language.get("KICK_ERRORARGS")}`)
			}
			else {
				let member;
				if (message.mentions.members.size > 0) {member = message.mentions.members.first();}
				else if (searchArgs) {
					member = message.bot.functions.fetchMembers(message.guild, searchArgs);
					if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
					else if (member.size === 1) member = member.first();
					else return message.channel.send(message.language.get("ERROR_MUCH_USER_FOUND"));
				}

				if (!member.kickable) {return message.channel.send(message.language.get("KICK_KICKABLE"));}

				let reason = args.slice(1).join(" ");
				if (!reason) {reason = message.language.get("KICK_NOREASON");}

				await member.kick(reason)
					.catch((error) => message.channel.send(`<:false:470303149077299231> ${message.author} ${message.language.get("KICK_ERROR")} ${error}`));
				message.channel.send(message.language.get("KICK_INFO", member, message))
			}
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Kick;
