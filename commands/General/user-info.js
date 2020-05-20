const Command = require("../../base/Command.js");
const moment = require("moment-timezone");

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
			aliases: ["userinfo", "ui"],
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
			var status = member.presence.status;
			if (status === "online") {
				status = `<:lycosOnline:712296523752275968> ${message.language.get("USERINFO_STATUS")[0]}`;
			} else if (status === "offline") {
				status = `<:lycosInvisible:712296523609669721> ${message.language.get("USERINFO_STATUS")[1]}`;
			} else if (status === "idle") {
				status = `<:lycosIdle:712362254560919624> ${message.language.get("USERINFO_STATUS")[2]}`;
			}  else if (status === "dnd") {
				status = `<:lycosDND:712296523232444458> ${message.language.get("USERINFO_STATUS")[3]}`;
			} else {
				status = message.language.get("USERINFO_UNKNOWN_STATUS");
			}
			let clientStatus;
			if (member.presence.clientStatus === null) {
				clientStatus = member.user.tag;
			}
			else if (member.presence.clientStatus.desktop) {
				clientStatus = member.user.tag;
			}
			else if (member.presence.clientStatus.mobile) { 
				clientStatus = `${member.user.tag} <:lycosPhone:711637746480971867>`;
			}
			var activity = member.presence.activities;
			console.log(activity);
			if (activity.length === 0) {
				activity = message.language.get("USERINFO_NO_ACTIVITY");
			} else {
				var text;
				for (let index = 0; index < activity.length; index++) {
					text = `${text ? text + "\n\n" + message.language.get("USERINFO_ACTIVITY_NUM", index) : message.language.get("USERINFO_ACTIVITY_NUM", index)}`;
					if (activity[index].type === "CUSTOM_STATUS" && activity[index].name === "Custom Status"){
						text = text + `\n${message.language.get("USERINFO_CS")}
${message.language.get("USERINFO_CS_NAME", activity[index])}`
					} else if (activity[index].type === "LISTENING" && activity[index].name === "Spotify"){
						text = text + `\n<:lycosSpotify:712064517265424445> ${message.language.get("USERINFO_SPOTIFY_LISTENING")}
**${message.language.get("USERINFO_SPOTIFY_TITLE")}** ${activity[index].details}
**${message.language.get("USERINFO_SPOTIFY_ARTIST")}** ${activity[index].state}
**${message.language.get("USERINFO_SPOTIFY_ALBUM")}** ${activity[index].assets.largeText}
**${message.language.get("USERINFO_SPOTIFY_DURATION")}** ${moment(moment(activity[index].timestamps.end.toUTCString()) - moment(activity[index].timestamps.start.toUTCString())).format("mm:ss")}
**${message.language.get("USERINFO_SPOTIFY_TIMEREMAINING")}** ${moment(moment(activity[index].timestamps.end.toUTCString()) - moment(new Date().toUTCString())).format("mm:ss")}`;
					} else if (activity[index].type === "STREAMING" && activity[index].name === "Twitch"){
						text = text + `\n<:Twitch:640189897566846976> ${message.language.get("USERINFO_TWITCH_STREAMING")}
**${message.language.get("USERINFO_TWITCH_TITLE")}** ${activity[index].details}
**${message.language.get("USERINFO_TWITCH_CATEGORY")}** ${activity[index].state}
**[${message.language.get("USERINFO_TWITCH_JOIN")}](${activity[index].url})**`;
					} else if (activity[index].type === "PLAYING" && !activity[index].assets){
						text = text + `\n${message.language.get("USERINFO_GAME_PLAYING")}
**${message.language.get("USERINFO_GAME_NAME")}** ${activity[index].name}`;
//Fonctionnel mais avec +1H... **${message.language.get("USERINFO_GAME_SINCE")}** ${moment(moment(new Date()) - (moment(activity[index].timestamps.start))).format("hh:mm:ss")}
					} else {
						if (activity[index].name) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_NAME", activity[index])}`;
						}
						if (activity[index].type) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_TYPE", activity[index])}`;
						}
						if (activity[index].url) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_URL", activity[index])}`;
						}
						if (activity[index].details) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_DETAILS", activity[index])}`;
						}
						if (activity[index].state) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_STATE", activity[index])}`;
						}
						if (activity[index].timestamps) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_TIMESTAMPS", activity[index].timestamps)}`;
						}
						if (activity[index].party) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_PARTY", activity[index].party)}`;
						}
						if (activity[index].assets) {
							text = text + `\n${message.language.get("USERINFO_ACTIVITY_ASSETS", activity[index].assets)}`;
						}
					}
				}
				activity = message.language.get("USERINFO_ACTIVITY_NUMBER", activity) + "\n" + text;
			}
			const createAccount = member.user.createdAt;
			const joinGuild = member.joinedAt;
			return message.channel.send({
				embed: {
					color: message.config.embed.color,
					author: {
						name: message.language.get("USERINFO_PROFIL") + member.user.username,
						icon_url: member.user.displayAvatarURL({format: "png",dynamic: true,}),
					},
					thumbnail: {
						url: member.user.displayAvatarURL({format: "png",dynamic: true,}),
					},
					fields: [
						{
							name: message.language.get("USERINFO_TITLES")[0],
							value: clientStatus,
							inline: true,
						},
						{
							name: message.language.get("USERINFO_TITLES")[1],
							value: member.user.id,
							inline: true,
						},
						{
							name: message.language.get("USERINFO_TITLES")[2],
							value: status,
							inline: true,
						},
						{
							name: message.language.get("USERINFO_TITLES")[3],
							value: message.language.get("USERINFO_CREATEACCOUNT", createAccount),
							inline: true,
						},
						{
							name: message.language.get("USERINFO_TITLES")[4],
							value: message.language.get("USERINFO_JOINGUILD", joinGuild),
							inline: true,
						},
						{
							name: message.language.get("USERINFO_TITLES_ACTIVITY", member.presence.activities),
							value: activity,
							inline: false,
						},
						{
							name : message.language.get("USERINFO_TITLES")[5],
							value : member.roles.cache.size > 10 ? `${member.roles.cache.sort(function compareNombres(a, b) {
								return b.position - a.position;
							  }).map((r) => r).slice(0, 9).join(", ")} ${message.language.get("USERINFO_ROLELIST", member)}` : (member.roles.cache.size < 1) ? `${message.language.get("USERINFO_NOROLES")}` : `${member.roles.cache.sort(function compareNombres(a, b) {
								return b.position - a.position;
							  }).map((r) => r).join(", ")}`
						},
					],
					timestamp: new Date(),
					footer: {
						text: message.config.embed.footer,
					},
				},
				split: true,
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = UserInformation;
