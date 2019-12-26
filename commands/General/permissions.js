const Command = require("../../base/Command.js");

class Permissions extends Command {
	constructor(client) {
		super(client, {
			name: "permissions",
			description: (language) => language.get("PERMISSIONS_DESCRIPTION"),
			usage: (language) => language.get("PERMISSIONS_USAGE"),
			examples: (language) => language.get("PERMISSIONS_EXAMPLES"),
			dirname: __dirname,
			enabled: false,
			guildOnly: true,
			aliases: ["perms"],
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 1000,
		});
	}

	async run(message, args) {
		try {
			const searchArgs = args.join(" ");
			let { member } = message;
			if (message.mentions.members.size > 0) {member = message.mentions.members.first();}
			else if (searchArgs) {
				member = message.bot.functions.fetchMembers(message.guild, searchArgs);
				if (member.size === 0) return message.channel.send(message.language.get("ERROR_NOUSER_FOUND"));
				else if (member.size === 1) member = member.first();
				else return message.channel.send(message.language.get("ERROR_MUCH_USER_FOUND"));
			}
			const permissions = ["ADMINISTRATOR", "CREATE_INSTANT_INVITE", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_CHANNELS", "MANAGE_GUILD", "ADD_REACTIONS", "VIEW_AUDIT_LOG", "PRIORITY_SPEAKER", "STREAM", "VIEW_CHANNEL", "SEND_MESSAGES", "SEND_TTS_MESSAGES", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "MENTION_EVERYONE", "USE_EXTERNAL_EMOJIS", "CONNECT", "SPEAK", "MUTE_MEMBERS", "DEAFEN_MEMBERS", "MOVE_MEMBERS", "USE_VAD", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_ROLES", "MANAGE_WEBHOOKS", "MANAGE_EMOJIS"];
			let text = "```\n" + message.language.get("PERMISSIONS_TITLE", member.user.username, message.channel.name) + "\n\n";
			const mPermissions = message.channel.permissionsFor(member);
			const total = {
				denied: 0,
				allowed: 0,
			};
			permissions.forEach((perm) => {
				if (!mPermissions.has(perm)) {
					text += `${perm} ❌\n`;
					total.denied++;
				}
				else {
					text += `${perm} ✅\n`;
					total.allowed++;
				}
			});
			text += `\n${total.allowed} ✅ | ${total.denied} ❌` + "\n```";
			message.channel.send(text);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Permissions;
