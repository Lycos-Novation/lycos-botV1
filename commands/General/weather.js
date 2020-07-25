const Command = require("../../base/Command.js");
const weather = require('weather-js');
class weatherInfo extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            description: (language) => language.get("WEATHERINFO_DESCRIPTION"),
            usage: (language, prefix) => language.get("WEATHERINFO_USAGE", prefix),
            examples: (language, prefix) => language.get("WEATHERINFO_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            aliases: ["weather-info", "weatherinfo", "meteo", "météo"],
            botPermissions: ["EMBED_LINKS"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            function generateEmbed(index, result) {
                let t = index === 0 ? message.language.get("WEATHERINFO_EMBED_TITLE_YESTERDAY", result) : index === 1 ? message.language.get("WEATHERINFO_EMBED_TITLE_TODAY", result) : index === 2 ? message.language.get("WEATHERINFO_EMBED_TITLE_TOMORROW", result) : index === 3 ? message.language.get("WEATHERINFO_EMBED_TITLE_J2", result) : index === 4 ? message.language.get("WEATHERINFO_EMBED_TITLE_J3", result) : message.language.get("WEATHERINFO_EMBED_TITLE_J4", result);
                let d = index === 0 ? message.language.get("WEATHERINFO_EMBED_DESCRIPTION_YESTERDAY", result) : index === 1 ? message.language.get("WEATHERINFO_EMBED_DESCRIPTION_TODAY", result) : index === 2 ? message.language.get("WEATHERINFO_EMBED_DESCRIPTION_TOMORROW", result) : index === 3 ? message.language.get("WEATHERINFO_EMBED_DESCRIPTION_J2", result) : index === 4 ? message.language.get("WEATHERINFO_EMBED_DESCRIPTION_J3", result) : message.language.get("WEATHERINFO_EMBED_DESCRIPTION_J4", result);;
                const embed = {
                    color: message.config.embed.color,
                    title: t,
                    description: d,
                    timestamp: new Date(),
                    footer: {
                        text: message.language.get("WEATHERINFO_EMBED_FOOTER", result),
                    },
                }
                return embed
            }

            let ville = args.join(" ");
            if (!ville) return message.reply(message.language.get("WEATHERINFO_NO_CITY"));
            weather.find({search: ville, degreeType: 'C', lang: message.language.get("WEATHER_LANGUAGE")}, function(err, result) {
                if (err) return console.log(err);
                if (!result[0]) return message.channel.send(message.language.get("WEATHERINFO_NOT_FOUND"));
            const author = message.author

            message.channel.send({ embed: generateEmbed(1, result) }).then(async (message) => {
                message.react('⬅️');
                await message.react('➡️');
                const collector = message.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                )
                let index = 1;
                collector.on('collect', reaction => {
                    message.reactions.removeAll().then(async () => {
                        if (reaction.emoji.name === '⬅️') {
                            index--;
                        } else if (reaction.emoji.name === '➡️') {
                            index++;
                        }
                        message.edit({ embed: generateEmbed(index, result)});
                        if (index > 0) await message.react('⬅️');
                        if (index < 5) message.react('➡️');
                    })
                })
            })
            });
            
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = weatherInfo;