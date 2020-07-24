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
			if (!args.join(" ")) return message.channel.send(message.language.get("ANIME_NOTFOUND"));
			function generateEmbed(index, data) {
				var embed = {
					color: message.config.embed.color,
					author: {
						name: data.englishTitle + ` (${data.japaneseTitle})`,
						url: data.url,
						icon_url: data.picture,
					},
					timestamp: new Date(),
					footer: {
						text: message.config.embed.footer,
					},
				}
				const embedFields = []
				if (index === 0) {
					embed.description = data.synopsis;
					embed.title = message.language.get("ANIME_TITLES")[0];
					embed.thumbnail = {
						url: data.picture,
					};
				} else if (index === 1) {
					embed.title = message.language.get("ANIME_TITLES")[1];
					var chars = "";
					data.characters.forEach(data => chars = chars + `**[${data.name}](${data.link}) (${message.language.get("ANIME_ROLE", data.role)})**
${message.language.get("ANIME_VOICE")} [${data.seiyuu.name}](${data.seiyuu.link})\n`
					)
					embed.description = chars;
					embed.thumbnail = {
						url: data.characters[0].picture,
					};
				} else if (index === 2) {
					embed.title = message.language.get("ANIME_TITLES")[2];
					embed.thumbnail = {
						url: data.staff[0].picture
					};
					var staff = "";
					data.staff.forEach(data => staff = staff + `**[${data.name}](${data.link})**
${message.language.get("ANIME_STAFF_ROLE", data.role)}\n`);
					embed.description = staff;
				} else if (index === 3) {
					embed.title = message.language.get("ANIME_TITLES")[3];
					embed.thumbnail = {
						url: data.picture,
					};
					embedFields.push({
						name: "Trailer",
						value: message.language.get("ANIME_TRAILER", data.trailer),
					},
					{
						name: message.language.get("ANIME_INFOS")[0],
						value: data.synonyms !== "" ? data.synonyms : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: "Type",
						value: data.type !== "" ? data.type : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[1],
						value: data.episodes !== "" ? data.episodes : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[2],
						value: data.status !== "" ? data.status : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[3],
						value: data.aired !== "" ? data.aired : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[4],
						value: data.premiered !== "" ? data.premiered : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[5],
						value: data.broadcast !== "" ? data.broadcast : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[6],
						value: data.producers !== "" ? data.producers.join(", ") : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: "Studios",
						value: data.studios !== "" ? data.studios.join(", ") : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: "Source",
						value: data.source !== "" ? data.source : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: "Genres",
						value: data.genres !== "" ? data.genres.join(", ") : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[7],
						value: data.duration !== "" ? data.duration : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[8],
						value: data.rating !== "" ? message.language.get("ANIME_RATING", data.rating) : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: "Score",
						value: (data.score !== "" ? `${data.score}/10` : message.language.get("ANIME_UNKNOWN")) + (data.scoreStats !== "" ? data.scoreStats : ""),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[9],
						value: data.ranked !== "" ? data.ranked : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[10],
						value: data.popularity !== "" ? data.popularity : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[11],
						value: data.members !== "" ? data.members : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: message.language.get("ANIME_INFOS")[12],
						value: data.favorites !== "" ? data.favorites : message.language.get("ANIME_UNKNOWN"),
						inline: true
					},
					{
						name: "ID",
						value: data.id !== "" ? data.id : message.language.get("ANIME_UNKNOWN"),
						inline: true
					});
					embed.fields = embedFields;
				}

				return embed
			}

			malScraper.getInfoFromName(args.join(" ")).then((data) => {
				console.log(data);

				// edit: you can store the message author like this:
				const author = message.author

				// send the embed with the first 10 guilds
				message.channel.send({ embed: generateEmbed(0, data) }).then(message => {
					// react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
					message.react('➡️')
					const collector = message.createReactionCollector(
						// only collect left and right arrow reactions from the message author
						(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
						/*// time out after a minute
						{ time: 60000 }*/
					)

					let index = 0;
					collector.on('collect', reaction => {
						// remove the existing reactions
						message.reactions.removeAll().then(async () => {
							// increase/decrease index
							if (reaction.emoji.name === '⬅️') {
								index--;
							} else if (reaction.emoji.name === '➡️') {
								index++;
							}
							// edit message with new embed
							message.edit({ embed: generateEmbed(index, data) });
							// react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
							if (index !== 0) await message.react('⬅️');
							// react with right arrow if it isn't the end
							if (index < 3) message.react('➡️');
						})
					})
				})



				/*return message.channel.send({
					embed: {
						color: message.config.embed.color,
						author: {
							name: data.englishTitle + `${data.japaneseTitle}`,
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
				});*/
			});
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = Anime;