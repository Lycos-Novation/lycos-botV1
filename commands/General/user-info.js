const Command = require("../../base/Command.js");

class UserInformation extends Command {
	constructor(client) {
		super(client, {
			name: "user-info",
			description: (language) => language.get("USERINFO_DESCRIPTION"),
			usage: (language, prefix) => language.get("USERINFO_USAGE", prefix),
			examples: (language, prefix) => language.get("USERINFO_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			permLevel: "User",
			aliases: ["userinfo"],
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
			let status = member.user.presence.status;
			switch (status) {
			case "online":
				status = `<:online:541159008837304340> ${message.language.get("USERINFO_STATUS")[0]}`;
				break;
			case "offline":
				status = `<:offline:541159007168102410> ${message.language.get("USERINFO_STATUS")[1]}`;
				break;
			case "idle":
				status = `<:away:541159006627168277> ${message.language.get("USERINFO_STATUS")[2]}`;
				break;
			case "dnd":
				status = `<:dnd:541159006941741056> ${message.language.get("USERINFO_STATUS")[3]}`;
				break;
			}
			let clientStatus;
			if(member.user.presence.clientStatus === null) {
				clientStatus = member.user.tag;
			}
			else if(member.user.presence.clientStatus.desktop) {
				clientStatus = member.user.tag;
			}
			else if(member.user.presence.clientStatus.mobile) { clientStatus = `${member.user.tag} <:phone:587242842510983188>`;}
			const activity = !!member.user.presence && member.user.presence.activity !== null ? member.user.presence.activity : message.language.get("USERINFO_NOPLAY");
			return message.channel.send({
				embed: {
					"color": message.config.embed.color,
					"author": {
						"name": message.language.get("USERINFO_PROFIL"),
						"icon_url": message.bot.user.displayAvatarURL(),
					},
					"thumbnail": {
						"url" : member.user.displayAvatarURL({ format: "png" }),
					},
					"fields" : [
						{
							"name" : message.language.get("USERINFO_TITLES")[0],
							"value" : clientStatus,
							"inline" : true,
						},
						{
							"name" : message.language.get("USERINFO_TITLES")[1],
							"value" : `${activity}`,
							"inline" : true,
						},
						{
							"name" : message.language.get("USERINFO_TITLES")[2],
							"value" : member.user.id,
							"inline" : true,
						},
						{
							"name" : message.language.get("USERINFO_TITLES")[3],
							"value" : status,
							"inline" : true,
						},
					],
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

module.exports = UserInformation;
