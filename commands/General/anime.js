const Command = require("../../base/Command.js");
const malScraper = require("mal-scraper");

class Anime extends Command {
	constructor(client) {
		super(client, {
			name: "anime",
			description: (language) => language.get("ANIME_DESCRIPTION"),
			usage: (language, prefix) => language.get("ANIME_USAGE", prefix),
			examples: (language, prefix) => language.get("ANIME_EXAMPLES", prefix),
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

	run(message, args) {
		try {
			if(!args.join(" ")) return message.channel.send(message.language.get("ANIME_NOTFOUND"));

			malScraper.getInfoFromName(args.join(" ")).then((data) => {
				return message.channel.send({
					embed: {
						color: message.config.embed.color,
						author: {
							name: `Anime (${data.englishTitle})`,
							url: data.url,
							icon_url: data.picture,
						},
						thumbnail: {
							url: data.picture,
						},
						fields: [
							{
								name: message.language.get("ANIME_TITLES")[0],
								value: data.englishTitle,
								inline: true,
							},
							{
								name: message.language.get("ANIME_TITLES")[1],
								value: data.japaneseTitle,
								inline: true,
							},
							{
								name: message.language.get("ANIME_TITLES")[2],
								value: data.type,
								inline: true,
							},
							{
								name: message.language.get("ANIME_TITLES")[3],
								value: data.episodes,
								inline: true,
							},
							{
								name: message.language.get("ANIME_TITLES")[4],
								value: data.genres[0],
								inline: true,
							},		
							{
								name: message.language.get("ANIME_TITLES")[5],
								value: data.popularity,
								inline: true,
							},
							{
								name: message.language.get("ANIME_TITLES")[6],
								value: `${data.score}/10 (${data.scoreStats}.)`,
								inline: true,
							},
						],
					},
				});
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Anime;