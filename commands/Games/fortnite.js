const Command = require("../../base/Command.js");
const Fortnite = require("fortnite");
const fortnite = new Fortnite("3efefe34-9d59-4d49-8775-e4efc752cd1c");

class FortniteStats extends Command {
	constructor(client) {
		super(client, {
			name: "fortnite",
			description: (language) => language.get("FORTNITE_DESCRIPTION"),
			usage: (language, prefix) => language.get("FORTNITE_USAGE", prefix),
			examples: (language, prefix) => language.get("FORTNITE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	run(message, args) {
		try {
			let platform = args[0];
			const user = args.slice(1).join(" ");

			if (!platform) {return message.channel.send(message.language.get("FORTNITE_PLATFORM"));}

			platform = platform.toLowerCase().replace("xbl", "none").replace("xbox", "xbl");

			if (platform !== "xbl" && platform !== "psn" && platform !== "pc") {return message.channel.send(message.language.get("ERROR_FORTNITE_PLATFORM"));}
			if (!user[0]) {return message.channel.send((message.language.get("FORTNITE_USERNAME_NULL")));}

			fortnite.user(user, platform).then((data) => {
				if (data.error !== message.language.get("FORTNITE_PLAYER_NOT_FOUND")) {
					return message.channel.send({
						embed: {
							author: {
								name: message.language.get("FORTNITE_PLAYER_STATS", data),
								icon_url: "https://images-ext-1.discordapp.net/external/qC98Cvto_CEupgrUP_0QJiLugVVtQjv8okcI2oifBf4/https/i.ebayimg.com/images/g/6ekAAOSw3WxaO8mr/s-l300.jpg",
							},
							color: message.config.embed.color,
							fields: [
								{
									name: message.language.get("FORTNITE_FIELDS")[0],
									value: message.language.get("FORTNITE_FIELDS_CONTENT_KILL", data),
								},
								{
									name: message.language.get("FORTNITE_FIELDS")[1],
									value: message.language.get("FORTNITE_FIELDS_CONTENT_MATCHSPLAYED", data),
								},
								{
									name: message.language.get("FORTNITE_FIELDS")[2],
									value: message.language.get("FORTNITE_FIELDS_CONTENT_VICTORIES", data),
								},
								{
									name: message.language.get("FORTNITE_FIELDS")[3],
									value: `${data.stats.lifetime.kd}`,
								},
							],
						},
					});
				}
				else {
					return message.channel.send(message.language.get("FORTNITE_PLAYER_NOT_FOUND"));
				}
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = FortniteStats;
