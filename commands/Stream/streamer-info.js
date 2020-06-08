const Command = require('../../base/Command');

const TwitchClient = require('twitch').default;
const clientId = 'TwitchClientID';
const clientSecret = 'TwitchCLientSecret';
const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret);
class streamerInfo extends Command {
    constructor(client) {
        super(client, {
            name: 'streamer-info',
            description: (language) => language.get("STREAMERINFO_DESCRIPTION"),
            usage: (language, prefix) => language.get("STREAMERINFO_USAGE", prefix),
            examples: (language, prefix) => language.get("STREAMERINFO_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: true,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["streamerinfo"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            var request = args[0];
            if (!request) {
                await message.channel.send(message.language.get("STREAMERINFO_NO_REQUEST")+"\n"+message.language.get("COMMAND_CANCEL"));
                request = await message.bot.functions.awaitResponse(message);
            }
            if (request.startsWith(message.prefix)) return;
            if (request.toLowerCase() === "stop" || request.toLowerCase() === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
            if (isNaN(parseInt(request))) {
                var user = await twitchClient.helix.users.getUserByName(request);
                if (user === null) return message.channel.send(message.language.get("CLIPGET_STREAMER_NOT_FOUND"));
                console.log(user);
                return message.channel.send({
                    embed: {
                        title: message.language.get("STREAMERINFO_EMBED_TITLE", user._data.display_name, user._data.broadcaster_type),
                        url: `https://twitch.tv/${user._data.login}`,
                        description: user._data.description,
                        fields: [
                            {
                                name: message.language.get("STREAMERINFO_EMBED_TITLES")[0],
                                value: user._data.view_count,
                                inline: true
                            },
                        ],
                        image: {
                            url: user._data.offline_image_url,
                        },
                        color: 0x6441a5,
                        thumbnail: {
                            url: user._data.profile_image_url,
                        },
                    }
                });
            } else {
                var user = await twitchClient.helix.users.getUserById(request);
                if (user === null) return message.channel.send(message.language.get("CLIPGET_STREAMER_NOT_FOUND"));
                return message.channel.send({
                    embed: {
                        title: user._data.display_name,
                        url: `https://twitch.tv/${user._data.login}`,
                        description: user._data.description,
                        fields: [
                            {
                                name: "broadcaster_type",//language.get("STREAMERINFO_EMBED_TITLES")[0],
                                value: user._data.broadcaster_type,//game === null ? language.get("STREAM_NO_GAME") : game._data.name,
                                inline: true
                            },
                            {
                                name: "Nombre de vues",//language.get("STREAMERINFO_EMBED_TITLES")[1],
                                value: user._data.view_count,
                                inline: true
                            },
                        ],
                        image: {
                            url: user._data.offline_image_url,
                        },
                        color: 0x6441a5,
                        thumbnail: {
                            url: user._data.profile_picture_url,
                        },
                    }
                });
            }
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = streamerInfo;