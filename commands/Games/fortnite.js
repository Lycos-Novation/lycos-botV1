const Command = require("../../base/Command.js");
const Discord = require("discord.js");
//const Fortnite = require("fortnite");
//const fortnite = new Fortnite("3efefe34-9d59-4d49-8775-e4efc752cd1c");

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

	async run(message, args) {
		try {
			const canvas = require("discord-canvas"),
				stat = new canvas.FortniteStats();

			let platform = args[0];
			const user = args.slice(1).join(" ");

			if (!platform) {return message.channel.send(message.language.get("FORTNITE_PLATFORM"));}

			platform = platform.toLowerCase().replace("xbl", "none").replace("xbox", "xbl");

			if (platform !== "xbl" && platform !== "psn" && platform !== "pc") {return message.channel.send(message.language.get("ERROR_FORTNITE_PLATFORM"));}
			if (!user[0]) {return message.channel.send((message.language.get("FORTNITE_USERNAME_NULL")));}

			let image = await stat
				.setToken("3efefe34-9d59-4d49-8775-e4efc752cd1c")
				.setUser(user)
				.setPlatform(platform)
				.toAttachment();

			if (platform !== "pc" && platform !== "xbl" && platform !== "psn") return message.channel.send("Please enter a valid platform")
			if (!image) return message.channel.send("User not found")

			let attachment = new Discord.MessageAttachment(image.toBuffer(), "FortniteStat.png");

			message.channel.send(attachment);
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = FortniteStats;
