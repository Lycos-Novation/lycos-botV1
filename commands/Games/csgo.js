const Command = require("../../base/Command.js");
const fetch = require("node-fetch");

class csgo extends Command {
	constructor(client) {
		super(client, {
			name: "csgo",
			description: (language) => language.get("CSGO_DESCRIPTION"),
			usage: (language, prefix) => language.get("CSGO_USAGE", prefix),
			examples: (language, prefix) => language.get("CSGO_EXAMPLES", prefix),
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			permLevel: "User",
			botPermissions: ["EMBED_LINKS"],
			aliases: ["CSGO", "cs-go", "CS-GO"],
			nsfw: false,
			adminOnly: false,
			cooldown: 2000,
		});
	}

	run(message, args) {
		try {
			var username = args[0];
			const url = `https://public-api.tracker.gg/v2/csgo/standard/profile/steam/${username.toLowerCase()}`;
                    const options = {
                        headers: {
                            "TRN-Api-Key": "c4b150f1-d8d2-412e-b8e6-2c1e7d270c48",
                        }
                    };
                    fetch(url, options)
                        .then(res => res.json())
                        .then(async (data) => {
							console.log(data);
                            /*var user = await twitchClient.helix.users.getUserById(data.users[0]._id);
                            return message.channel.send({
                                embed: {
                                    title: message.language.get("STREAMERINFO_EMBED_TITLE", user._data.display_name, user._data.broadcaster_type),
                                    url: `https://twitch.tv/${user._data.login}`,
                                    description: user._data.description,
                                    fields: [
                                        {
                                            name: message.language.get("STREAM_EMBED_TITLES")[0],
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
                            });*/
                        });
		}
		catch (error) {
			console.error(error);
			return message.channel.send(message.language.get("ERROR", error));
		}
	}
}

module.exports = csgo;
