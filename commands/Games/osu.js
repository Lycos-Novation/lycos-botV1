const Command = require("../../base/Command.js");
const osu = require('node-osu');
const osuApi = new osu.Api('dbb951f8d02090ebacc0fcfde7152ad677d79be1', {
    notFoundAsError: false,
    completeScores: true,
    parseNumeric: true
});
class Osu extends Command {
    constructor(client) {
        super(client, {
            name: "osu",
            description: (language) => language.get("OSU_DESCRIPTION"),
            usage: (language, prefix) => language.get("OSU_USAGE", prefix),
            examples: (language, prefix) => language.get("OSU_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            nsfw: false,
            aliases: ["osu!"],
            adminOnly: false,
            cooldown: 2000,
        });
    }

    async run(message, args) {
        try {
            var player = args.join(" ");
            if (!player) {
                message.channel.send(message.language.get("OSU_SUPPLY_PLAYER")+"\n"+message.language.get("COMMAND_CANCEL"));
                player = await message.bot.functions.awaitResponse(message);
            }
            if (player.startsWith(message.prefix)) return;
            if (player.toLowerCase() === "stop" || player.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
            osuApi.getUser({ u: player }).then((user) => {
                if (user.length === 0) return message.channel.send(message.language.get("OSU_USER_NOT_FOUND"));
                return message.channel.send({
                    embed: {
                        author: {
                            name: message.language.get("OSU_EMBED_AUTHOR", user)//id, name, country
                        },
                        color: message.config.embed.color,
                        thumbnail: {
                            url: message.bot.emojis.cache.get("709769875035258951").url
                        },
                        fields: [
                            {
                                name: message.language.get("OSU_FIELDS")[0],//secondsPlayed + raw_joinDate
                                value: message.language.get("OSU_JOINED_DATE", user) + convertSecondsTo(user.secondsPlayed)
                            },
                            {
                                name: message.language.get("OSU_FIELDS")[1],//Level
                                value : user.level
                            },
                            {
                                name: message.language.get("OSU_FIELDS")[2],//Accuracy
                                value: user.accuracy+"%"
                            },
                            {
                                name: message.language.get("OSU_FIELDS")[3],//pp
                                value: message.language.get("OSU_PP", user)
                            },
                            {
                                name: message.language.get("OSU_FIELDS")[4],//scores
                                value: message.language.get("OSU_SCORES", user)
                            },
                            {
                                name: message.language.get("OSU_FIELDS")[5],//counts
                                value: message.language.get("OSU_COUNTS", user)
                            },
                            {
                                name: message.language.get("OSU_FIELDS")[6],//played
                                value: user.counts.plays
                            },
                        ]
                    }
                });
            });
        }
        catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
        function convertSecondsTo(sec) {
            var hours = Math.floor(sec / 3600);
            var minutes = Math.floor((sec - (hours * 3600)) / 60);
            var seconds = sec - (hours * 3600) - (minutes * 60);
            seconds = Math.round(seconds * 100) / 100

            var result = (hours < 10 ? "0" + hours : hours);
            result += "H" + (minutes < 10 ? "0" + minutes : minutes);
            result += "m" + (seconds < 10 ? "0" + seconds : seconds) + "s";
            return result;
        }
    }
}

module.exports = Osu;
