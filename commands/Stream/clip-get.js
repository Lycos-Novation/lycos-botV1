const Command = require('../../base/Command');
const fetch = require("node-fetch");
const config = require('../../config')
const TwitchClient = require('twitch').default;
const twitchClient = TwitchClient.withCredentials(config.twitch.clientID, config.twitch.client_token);
class clipGet extends Command {
    constructor(client) {
        super(client, {
            name: 'clip-get',
            description: (language) => language.get("CLIPGET_DESCRIPTION"),
            usage: (language, prefix) => language.get("CLIPGET_USAGE", prefix),
            examples: (language, prefix) => language.get("CLIPGET_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["get-clip", "clips-get", "get-clips", "getclip", "getclips", "clipget", "clipsget"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            var method = args[0];
            if (!method) {
                await message.channel.send(message.language.get("CLIPGET_NO_METHOD")+"\n"+message.language.get("COMMAND_CANCEL"));
                method = await message.bot.functions.awaitResponse(message);
            }
            if (method.startsWith(message.prefix)) return;
            if (method.toLowerCase() === "stop" || method.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
            if (method === "id") {
                var id = args[1];
                if (!id) {
                    await message.channel.send(message.language.get("CLIPGET_NO_CLIPID")+"\n"+message.language.get("COMMAND_CANCEL"));
                    id = await message.bot.functions.awaitResponse(message);
                }
                if (id.startsWith(message.prefix)) return;
                if (id.toLowerCase() === "stop" || id.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                const clip = await twitchClient.helix.clips.getClipById(id);
                return message.channel.send({
                    embed: {
                        title: clip._data.title,
                        url: clip._data.url,
                        fields: [
                            {
                                name: message.language.get("CLIPGET_ID_EMBED_TITLES")[0],
                                value: clip._data.broadcaster_name,
                                inline: true
                            },
                            {
                                name: message.language.get("CLIPGET_ID_EMBED_TITLES")[1],
                                value: clip._data.language,
                                inline: true
                            },
                            {
                                name: message.language.get("CLIPGET_ID_EMBED_TITLES")[2],
                                value: clip._data.view_count,
                                inline: true
                            },
                            {
                                name: message.language.get("CLIPGET_ID_EMBED_TITLES")[3],
                                value: message.language.get("CLIPGET_ID_CREATION_DATE", clip._data.created_at),
                                inline: true
                            },
                        ],
                        color: 0x6441a5,
                        thumbnail: {
                            url: clip._data.thumbnail_url,
                        },
                    }
                })
            } else if (method === "streamer") {
                var streamer = args[1];
                if (!streamer) {
                    await message.channel.send(message.language.get("CLIPGET_NO_STREAMER")+"\n"+message.language.get("COMMAND_CANCEL"));
                    streamer = await message.bot.functions.awaitResponse(message);
                }
                if (streamer.startsWith(message.prefix)) return;
                if (streamer.toLowerCase() === "stop" || streamer.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                const user = await twitchClient.helix.users.getUserByName(streamer);
                if (user === null) return message.channel.send(message.language.get("CLIPGET_STREAMER_NOT_FOUND"));
                var num = args[2];
                if (isNaN(parseInt(num))) num = 1;
                if (parseInt(num) > 10 || parseInt(num) < 1) return message.channel.send(message.language.get("CLIPGET_STREAMER_NUMBER"));
                const clip = await twitchClient.helix.clips.getClipsForBroadcaster(user._data.id, {
                    limit: num,
                });
                var text = "";
                for (var i = 0; i < clip.data.length; i++) {
                    if (text === "") {
                        text = `**${i + 1}.** [${clip.data[i]._data.title.slice(clip.data[i]._data.title.length - 1, clip.data[i]._data.title.length) === "\n" ? clip.data[i]._data.title.slice(0, clip.data[i]._data.title.length - 1) : clip.data[i]._data.title}](${clip.data[i]._data.url}) (ID - ${clip.data[i]._data.id})
• ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDBY")} ${clip.data[i]._data.creator_name} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDAT", clip.data[i]._data.created_at)}`;
                    } else {
                        text = text + `\n**${i + 1}.** [${clip.data[i]._data.title.slice(clip.data[i]._data.title.length - 1, clip.data[i]._data.title.length) === "\n" ? clip.data[i]._data.title.slice(0, clip.data[i]._data.title.length - 1) : clip.data[i]._data.title}](${clip.data[i]._data.url}) (ID - ${clip.data[i]._data.id})
• ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDBY")} ${clip.data[i]._data.creator_name} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDAT", clip.data[i]._data.created_at)}`
                    }
                }
                return message.channel.send({
                    embed: {
                        title: message.language.get("CLIPGET_STREAMER_EMBED_TITLE", num, clip.data[0]._data.broadcaster_name),
                        description: text,
                        color: 0x6441a5,
                    }
                });
            } else if (method === "game") {
                var gameToSearch = args.slice(1).join(" ");
                if (!gameToSearch) {
                    await message.channel.send(message.language.get("CLIPGET_NO_GAME")+"\n"+message.language.get("COMMAND_CANCEL"));
                    gameToSearch = await message.bot.functions.awaitResponse(message);
                }
                if (gameToSearch.startsWith(message.prefix)) return;
                if (gameToSearch.toLowerCase() === "stop" || gameToSearch.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                const game = await twitchClient.helix.games.getGameByName(gameToSearch);
                console.log(game);
                if (game === null) return message.channel.send(message.language.get("CLIPGET_GAME_NOT_FOUND"));
                var num = args[2];
                if (isNaN(parseInt(num))) num = 1;
                if (parseInt(num) > 10 || parseInt(num) < 1) return message.channel.send(message.language.get("CLIPGET_STREAMER_NUMBER"));
                const clip = await twitchClient.helix.clips.getClipsForGame(game._data.id, {
                    limit: num,
                });
                var text = "";
                for (var i = 0; i < clip.data.length; i++) {
                    if (text === "") {
                        text = `**${i + 1}.** [${clip.data[i]._data.title.slice(clip.data[i]._data.title.length - 1, clip.data[i]._data.title.length) === "\n" ? clip.data[i]._data.title.slice(0, clip.data[i]._data.title.length - 1) : clip.data[i]._data.title}](${clip.data[i]._data.url}) (ID - ${clip.data[i]._data.id})
• ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDBY")} ${clip.data[i]._data.creator_name} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDAT", clip.data[i]._data.created_at)} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDCHANNEL", clip.data[i]._data.broadcaster_name)}`;
                    } else {
                        text = text + `\n**${i + 1}.** [${clip.data[i]._data.title.slice(clip.data[i]._data.title.length - 1, clip.data[i]._data.title.length) === "\n" ? clip.data[i]._data.title.slice(0, clip.data[i]._data.title.length - 1) : clip.data[i]._data.title}](${clip.data[i]._data.url}) (ID - ${clip.data[i]._data.id})
• ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDBY")} ${clip.data[i]._data.creator_name} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDAT", clip.data[i]._data.created_at)} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDCHANNEL", clip.data[i]._data.broadcaster_name)}`
                    }
                }
                return message.channel.send({
                    embed: {
                        title: message.language.get("CLIPGET_GAME_EMBED_TITLE", num, game._data.name),
                        description: text,
                        color: 0x6441a5,
                    }
                })
            } else if (method === "top") {
                var period = args[1];
                if (!period) {
                    await message.channel.send(message.language.get("CLIPGET_TOP_NO_PERIOD")+"\n"+message.language.get("COMMAND_CANCEL"));
                    period = await message.bot.functions.awaitResponse(message);
                }
                if (period.startsWith(message.prefix)) return;
                if (period.toLowerCase() === "stop" || period.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
                const url = `https://api.twitch.tv/kraken/clips/top?period=${period}&trending=false&limit=5`;
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
                        for (var i = 0; i < data.clips.length; i++) {
                            if (text === "") {
                                text = `**${i + 1}.** [${data.clips[i].title.slice(data.clips[i].title.length - 1, data.clips[i].title.length) === "\n" ? data.clips[i].title.slice(0, data.clips[i].title.length - 1) : data.clips[i].title}](${data.clips[i].url}) (${data.clips[i].game})
• ${message.language.get("CLIPGET_TOP_EMBED_CREATEDAT", data.clips[i].created_at)} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDCHANNEL", data.clips[i].broadcaster.name)} | ${data.clips[i].views} ${message.language.get("CLIPGET_TOP_EMBED_VIEWS")}`;
                            } else {
                                text = text + `\n**${i + 1}.** [${data.clips[i].title.slice(data.clips[i].title.length - 1, data.clips[i].title.length) === "\n" ? data.clips[i].title.slice(0, data.clips[i].title.length - 1) : data.clips[i].title}](${data.clips[i].url}) (${data.clips[i].game})
• ${message.language.get("CLIPGET_TOP_EMBED_CREATEDAT", data.clips[i].created_at)} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDCHANNEL", data.clips[i].broadcaster.name)} | ${data.clips[i].views} ${message.language.get("CLIPGET_TOP_EMBED_VIEWS")}`
                            }
                        }
                        return message.channel.send({
                            embed: {
                                title: message.language.get("CLIPGET_TOP_EMBED_TITLE", period),
                                description: text,
                                color: 0x6441a5,
                                thumbnail: {
                                    url: data.clips[0].thumbnails.medium,
                                },
                            },
                            split: true,
                        })
                    });
            } else if (method === "trending") {
                const url = `https://api.twitch.tv/kraken/clips/top?period=all&trending=true&limit=5`;
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
                        for (var i = 0; i < data.clips.length; i++) {
                            if (text === "") {
                                text = `**${i + 1}.** [${data.clips[i].title.slice(data.clips[i].title.length - 1, data.clips[i].title.length) === "\n" ? data.clips[i].title.slice(0, data.clips[i].title.length - 1) : data.clips[i].title}](${data.clips[i].url}) (${data.clips[i].game})
• ${message.language.get("CLIPGET_TOP_EMBED_CREATEDAT", data.clips[i].created_at)} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDCHANNEL", data.clips[i].broadcaster.name)} | ${data.clips[i].views} ${message.language.get("CLIPGET_TOP_EMBED_VIEWS")}`;
                            } else {
                                text = text + `\n**${i + 1}.** [${data.clips[i].title.slice(data.clips[i].title.length - 1, data.clips[i].title.length) === "\n" ? data.clips[i].title.slice(0, data.clips[i].title.length - 1) : data.clips[i].title}](${data.clips[i].url}) (${data.clips[i].game})
• ${message.language.get("CLIPGET_TOP_EMBED_CREATEDAT", data.clips[i].created_at)} ${message.language.get("CLIPGET_STREAMER_EMBED_CREATEDCHANNEL", data.clips[i].broadcaster.name)} | ${data.clips[i].views} ${message.language.get("CLIPGET_TOP_EMBED_VIEWS")}`
                            }
                        }
                        return message.channel.send({
                            embed: {
                                title: message.language.get("CLIPGET_TRENDING_EMBED_TITLE", period),
                                description: text,
                                color: 0x6441a5,
                                thumbnail: {
                                    url: data.clips[0].thumbnails.medium,
                                },
                            },
                            split: true,
                        })
                    });
            } else {
                return message.channel.send(message.language.get("CLIPGET_BAD_METHOD"));
            }
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = clipGet;