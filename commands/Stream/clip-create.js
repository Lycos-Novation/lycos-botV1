const Command = require('../../base/Command');
const config = require('../../config')
const TwitchClient = require('twitch').default;
const twitchClient = TwitchClient.withCredentials(config.twitch.clientID, config.twitch.client_token);
class clipCreate extends Command {
    constructor(client) {
        super(client, {
            name: 'clip-create',
            description: (language) => language.get("CLIPCREATE_DESCRIPTION"),
            usage: (language, prefix) => language.get("CLIPCREATE_USAGE", prefix),
            examples: (language, prefix) => language.get("CLIPCREATE_EXAMPLES", prefix),
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            permLevel: "User",
            botPermissions: ["SEND_MESSAGES"],
            aliases: ["clipcreate", "createclip", "create-clip"],
            nsfw: false,
            adminOnly: true,
            cooldown: 1000
        });
    }

    async run(message, args) {
        try {
            var chan = args[0];
            if (!chan) {
                await message.channel.send(message.language.get("CLIPCREATE_NO_CHANNEL")+"\n"+message.language.get("COMMAND_CANCEL"));
                chan = await message.bot.functions.awaitResponse(message);
            }
            if(chan.startsWith(message.prefix)) return;
            if (chan === "stop" || chan === "cancel") return message.channel.send(message.language.get("COMMAND_CANCELLED"));
            const stream = await twitchClient.helix.streams.getStreamByUserName(chan);
            if (stream === null) return message.channel.send(message.language.get("CLIPCREATE_NO_LIVE"));
            const clipId = await twitchClient.helix.clips.createClip({ channelId: stream._data.user_id });
            return message.channel.send(message.language.get("CLIPCREATE_CREATED", clipId, stream._data.user_name));
        } catch (error) {
            console.error(error);
            return message.channel.send(message.language.get("ERROR", error));
        }
    }
}
module.exports = clipCreate;