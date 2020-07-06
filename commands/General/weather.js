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
            //you can store the message author like this:
            const author = message.author

            // send the embed with the first 10 guilds
            message.channel.send({ embed: generateEmbed(1, result) }).then(async (message) => {
                // react with the right arrow (so that the user can click it) (left arrow isn't needed because it is the start)
                await message.react('⬅️');
                await message.react('➡️');
                const collector = message.createReactionCollector(
                    // only collect left and right arrow reactions from the message author
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
                    /*// time out after a minute
                    { time: 60000 }*/
                )
                let index = 1;
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
                        message.edit({ embed: generateEmbed(index, result)});
                        // react with left arrow if it isn't the start (await is used so that the right arrow always goes after the left)
                        if (index > 0) await message.react('⬅️');
                        // react with right arrow if it isn't the end
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