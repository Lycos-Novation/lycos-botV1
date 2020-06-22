const Command = require('../../base/Command');
const fetch = require("node-fetch");
const clientId = 'TwitchClientID';
class topGames extends Command {
    constructor(client) {
        super(client, {
            name: 'games-top',
            description: (language) => language.get("GAMETOP_DESCRIPTION"),
            usage: (language, prefix) => language.get("GAMETOP_USAGE", prefix),
            examples: (language, prefix) => language.get("GAMETOP_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["gametop", "topgames", "gamestop", "top-game", "top-games", "game-top"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            const url = `https://api.twitch.tv/kraken/games/top`;
            const options = {
                headers: {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": clientId
                }
            };
            fetch(url, options)
                .then(res => res.json())
                .then(async (data) => {
                    var text = "";
                    for (var i = 0; i < data.top.length; i++) {
                        if (text === "") {
                            text = `**${i + 1}.** ${data.top[i].game.name} | ${data.top[i].viewers} viewers ${message.language.get("GAMETOP_EMBED_ON")} ${data.top[i].channels} ${message.language.get("GAMETOP_EMBED_CHANNELS")}`;
                        } else {
                            text = text + `\n**${i + 1}.** ${data.top[i].game.name} | ${data.top[i].viewers} viewers ${message.language.get("GAMETOP_EMBED_ON")} ${data.top[i].channels} ${message.language.get("GAMETOP_EMBED_CHANNELS")}`
                        }
                    }
                    return message.channel.send({
                        embed: {
                            title: message.language.get("GAMETOP_EMBED_TITLE"),
                            description: text,
                            color: 0x6441a5,
                            thumbnail: {
                                url: data.top[0].game.box.large,
                                width: 272,
                                height: 380,
                            },
                            footer: {
                                text: message.config.embed.footer,
                            },
                            timestamp: new Date(),
                        }
                    })
                });
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = topGames;