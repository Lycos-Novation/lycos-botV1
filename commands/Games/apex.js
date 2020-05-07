const Command = require("../../base/Command.js");
const API = require("apextab-api"), ApexTab  = API.Apextab_API;
const { RichEmbed } = require("discord.js");
class ApexStats extends Command {
	constructor(client) {
		super(client, {
			name: "apex",
			description: (language) => language.get("FORTNITE_DESCRIPTION"),
			usage: (language, prefix) => language.get("FORTNITE_USAGE", prefix),
			examples: (language, prefix) => language.get("FORTNITE_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			aliases: ["apex_legend", "apex-stats"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	async run(message, args) {
        if(!args[0]) return message.channel.send("Please supply a username.");
        if(!args[1]) return message.channel.send("Please supply a platform to check. `pc`, `xbox` or `ps4`");

        const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
        const platform = platformCheck[args[1].toLowerCase()];

        try {
            const results = await ApexTab.searchPlayer(args[0], platform ? platform : API.Platform.PC)
            
                for (let playerResult of results.results) {
                    const player = await ApexTab.getPlayerById(playerResult.aid)
                    const { name, skillratio, visits, avatar, legend, level, kills, headshots, matches, globalrank, utime } = player;

                        const embed = new RichEmbed()
                            .setColor(cyan)
                            .setAuthor(`Origin (Apex Legends) | ${name}`, avatar)
                            .setThumbnail(avatar)
                            .setDescription(stripIndents`
                                **Active Legend:** ${legend || "Not Found."}
                                **Global Rank:** ${globalrank || "Not Ranked."}
                                **level:** ${level || 0}
                                **Skill Ratio:** ${skillratio || "0%"}
                                **Matches:** ${matches || 0}
                                **Kills:** ${kills || 0}
                                **Headshots:** ${headshots || 0}
                                **Visits:** ${visits || 0}
                                **PlayTime:** ${Math.ceil(utime / (1000 * 60 * 60 * 24)) || 0} days
                            `)
                            .setTimestamp()

                        message.channel.send(embed)
                }
        } catch(error) {
			console.error(error);
			message.channel.send(message.language.get("ERROR", error));
            return message.channel.send("Can't find a player by that")
        }
    }
}
			/*let platform = args[0];
			if (!platform) return message.channel.send(message.language.get("APEX_PLATFORM"));
			platform = platform.toLowerCase().replace("xbl", "none").replace("xbox", "xbl").replace("psn", "ps4");
			if (platform !== "xbl" && platform !== "ps4" && platform !== "pc") return message.channel.send(message.language.get("APEX_ERROR_PLATFORM"));
            const platformCheck = { pc: API.Platform.PC, xbox: API.Platform.XBOX_ONE, ps4: API.Platform.PS4 };
        	platform = platformCheck[platform];
            const user = args.slice(1).join(" ");
            if (!user[0]) return message.channel.send((message.language.get("APEXE_USERNAME_NULL")));

			ApexTab_API.searchPlayer(user, platform).then((results) => {
				message.channel.send("Stats apex en console");
				console.log(results);
			});

		} catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}*/

module.exports = ApexStats;
