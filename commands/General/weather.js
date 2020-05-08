const Command = require("../../base/Command.js");
const weather = require('weather-js');
class weatherInfo extends Command {
    constructor(client) {
        super(client, {
            name: "weather-info",
            description: (language) => language.get("WEATHERINFO_DESCRIPTION"),
            usage: (language, prefix) => language.get("WEATHERINFO_USAGE", prefix),
            examples: (language, prefix) => language.get("WEATHERINFO_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            aliases: ["weather", "weatherinfo", "meteo", "météo"],
            botPermissions: ["EMBED_LINKS"],
            nsfw: false,
            adminOnly: false,
            cooldown: 1000,
        });
    }

    async run(message, args) {
        try {
            let ville = args.join(" ");
            if(!ville) return message.reply(message.language.get("WEATHERINFO_NO_CITY"));
            weather.find({search: ville, degreeType: 'C', lang: message.language.get("WEATHER_LANGUAGE")}, function(err, result) {
                if(err) return console.log(err);
                if(!result[0]) return message.channel.send(message.language.get("WEATHERINFO_NOT_FOUND"));
                return message.channel.send({
                    embed: {
                        color: message.config.embed.color,
                        author: {
                            name: message.language.get("WEATHERINFO_EMBED_TITLE", result),
                            icon_url: message.bot.user.displayAvatarURL({format: "png",dynamic: true})
                        },
                        thumbnail: {
                            url: message.member.displayAvatarURL({format: "png",dynamic: true})
                        },
                        description: message.language.get("WEATHERINFO_EMBED_DESCRIPTION", result),
                        timestamp: new Date(),
                        footer: {
                            text: message.config.embed.footer,
                        },
                    }
                });
            });
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}

module.exports = weatherInfo;